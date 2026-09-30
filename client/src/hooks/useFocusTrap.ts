import { useEffect, useRef, RefObject } from "react";

export interface UseFocusTrapOptions {
  isActive: boolean;
  onEscape?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  initialFocusSelector?: string;
  returnFocusElement?: HTMLElement | null;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Global LIFO stack for modal escape handlers to ensure only the topmost dialog closes
const escapeStack: Array<() => void> = [];

if (typeof window !== "undefined") {
  window.addEventListener(
    "keydown",
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && escapeStack.length > 0) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const topmostOnEscape = escapeStack[escapeStack.length - 1];
        topmostOnEscape?.();
      }
    },
    true
  );
}

/**
 * Custom hook to trap keyboard focus within a modal or dialog container.
 * Features:
 * - Traps Tab and Shift+Tab cycling strictly within container focusable elements.
 * - Manages LIFO Escape stack so only the topmost nested dialog is dismissed.
 * - Supports arrow key shortcuts (ArrowLeft / ArrowRight) for project navigation.
 * - Automatically sets initial focus when dialog opens.
 * - Restores focus to the triggering element upon closure.
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  containerRef: RefObject<T | null>,
  options: UseFocusTrapOptions
) {
  const {
    isActive,
    onEscape,
    onArrowLeft,
    onArrowRight,
    initialFocusSelector,
    returnFocusElement,
  } = options;

  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  // Register in LIFO escape stack when active
  useEffect(() => {
    if (!isActive || !onEscape) return;

    const handler = () => {
      onEscapeRef.current?.();
    };

    escapeStack.push(handler);

    return () => {
      const idx = escapeStack.lastIndexOf(handler);
      if (idx !== -1) {
        escapeStack.splice(idx, 1);
      }
    };
  }, [isActive, onEscape]);

  useEffect(() => {
    if (!isActive) return;

    // Save previous active element before opening dialog
    previousActiveElementRef.current =
      returnFocusElement || (document.activeElement as HTMLElement | null);

    const container = containerRef.current;
    if (!container) return;

    // Helper to get visible focusable elements
    const getFocusableElements = (): HTMLElement[] => {
      if (!containerRef.current) return [];
      const rawElements = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      return rawElements.filter((el) => {
        // Must be visible and not hidden
        return (
          el.offsetParent !== null ||
          el.offsetWidth > 0 ||
          el.offsetHeight > 0 ||
          el.getClientRects().length > 0
        );
      });
    };

    // Set initial focus
    const initialTimer = window.setTimeout(() => {
      if (!containerRef.current) return;
      if (initialFocusSelector) {
        const customTarget = containerRef.current.querySelector<HTMLElement>(
          initialFocusSelector
        );
        if (customTarget) {
          customTarget.focus();
          return;
        }
      }
      const focusable = getFocusableElements();
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        containerRef.current.focus();
      }
    }, 40);

    const handleKeyDown = (event: KeyboardEvent) => {
      // 1. ARROW NAVIGATION (Previous / Next project)
      if (
        (event.key === "ArrowLeft" || event.key === "[" || event.key === "p") &&
        onArrowLeft
      ) {
        const target = event.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
        ) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        onArrowLeft();
        return;
      }

      if (
        (event.key === "ArrowRight" || event.key === "]" || event.key === "n") &&
        onArrowRight
      ) {
        const target = event.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
        ) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        onArrowRight();
        return;
      }

      // 2. TAB: Trap focus within container
      if (event.key === "Tab") {
        const container = containerRef.current;
        if (!container) return;

        const focusable = getFocusableElements();
        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];
        const currentActive = document.activeElement as HTMLElement | null;

        if (event.shiftKey) {
          // Backward Tab (Shift + Tab)
          if (
            !currentActive ||
            currentActive === firstElement ||
            !container.contains(currentActive)
          ) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Forward Tab
          if (
            !currentActive ||
            currentActive === lastElement ||
            !container.contains(currentActive)
          ) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.clearTimeout(initialTimer);
      window.removeEventListener("keydown", handleKeyDown, true);

      // Return focus to previously active element
      const elementToFocus =
        returnFocusElement || previousActiveElementRef.current;
      if (elementToFocus && typeof elementToFocus.focus === "function") {
        window.setTimeout(() => {
          elementToFocus.focus();
        }, 16);
      }
    };
  }, [
    isActive,
    onArrowLeft,
    onArrowRight,
    initialFocusSelector,
    returnFocusElement,
  ]);
}
