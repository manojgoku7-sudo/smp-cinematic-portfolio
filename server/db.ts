import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, User, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let db: any;
try {
  if (process.env.DATABASE_URL) {
    db = drizzle(process.env.DATABASE_URL);
  } else {
    throw new Error("DATABASE_URL not set");
  }
} catch {
  console.warn('[AI Studio] Database not connected — using mock');
  const noOp = {
    findMany: async () => [],
    findFirst: async () => null,
    findUnique: async () => null,
    create: async (d: any) => d?.data ?? {},
    update: async (d: any) => d?.data ?? {},
    delete: async () => ({}),
  };
  db = new Proxy({}, {
    get: (_, prop) => prop === 'query'
      ? new Proxy({}, { get: () => noOp }) : async () => [],
  });
}
export { db };

let _db: ReturnType<typeof drizzle> | null = null;
const memoryUsers = new Map<string, User>();
let nextMemoryId = 1;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const now = new Date();
  const existing = memoryUsers.get(user.openId);
  const role =
    user.role ??
    existing?.role ??
    (user.openId === ENV.ownerOpenId ? "admin" : "user");
  memoryUsers.set(user.openId, {
    id: existing?.id ?? nextMemoryId++,
    openId: user.openId,
    name: user.name !== undefined ? (user.name ?? null) : (existing?.name ?? null),
    email: user.email !== undefined ? (user.email ?? null) : (existing?.email ?? null),
    loginMethod:
      user.loginMethod !== undefined
        ? (user.loginMethod ?? null)
        : (existing?.loginMethod ?? null),
    role,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    lastSignedIn: user.lastSignedIn ?? existing?.lastSignedIn ?? now,
  });

  const dbInstance = await getDb();
  if (!dbInstance) {
    console.warn("[Database] Cannot upsert user: database not available (saved in memory)");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await dbInstance.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.warn("[Database] Failed to upsert user in DB, using in-memory store:", error);
  }
}

export async function getUserByOpenId(openId: string) {
  const dbInstance = await getDb();
  if (!dbInstance) {
    console.warn("[Database] Cannot get user: database not available (using in-memory store)");
    return memoryUsers.get(openId);
  }

  try {
    const result = await dbInstance.select().from(users).where(eq(users.openId, openId)).limit(1);
    return result.length > 0 ? result[0] : memoryUsers.get(openId);
  } catch (error) {
    console.warn("[Database] Failed to query user from DB, using in-memory store:", error);
    return memoryUsers.get(openId);
  }
}

// TODO: add feature queries here as your schema grows.
