import React, { useState, useEffect } from "react";
import { Cpu, Activity, Zap, RefreshCw, Layers, ShieldCheck, Play, HardDrive } from "lucide-react";

interface ProcessorMonitorProps {
  onSimulateWorkload?: () => void;
}

interface CoreData {
  id: string;
  name: string;
  type: "P" | "E";
  baseLoad: number;
  freq: string;
}

export function ProcessorMonitor({ onSimulateWorkload }: ProcessorMonitorProps) {
  const [isSpiking, setIsSpiking] = useState(false);
  const [tick, setTick] = useState(0);

  // Dynamic live fluctuation for 6 Performance + 6 Efficiency cores
  const [coreLoads, setCoreLoads] = useState<number[]>([
    68, 74, 59, 82, 63, 71, // P-Cores
    24, 31, 18, 29, 22, 35, // E-Cores
  ]);

  const [npuLoad, setNpuLoad] = useState(74);
  const [ramUsed, setRamUsed] = useState(14.8);
  const [packagePower, setPackagePower] = useState(14.4);
  const [temperature, setTemperature] = useState(41.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
      setCoreLoads((prev) =>
        prev.map((val, idx) => {
          if (isSpiking) {
            // High load when simulation is active
            const target = idx < 6 ? 88 + Math.random() * 9 : 45 + Math.random() * 15;
            return Math.min(99, Math.max(10, Math.round(target)));
          }
          // Organic breathing fluctuation
          const jitter = (Math.random() - 0.5) * 8;
          const base = idx < 6 ? 65 : 28;
          return Math.min(96, Math.max(12, Math.round(base + jitter)));
        })
      );

      setNpuLoad((prev) => {
        const jitter = (Math.random() - 0.5) * 6;
        return Math.min(95, Math.max(40, Math.round(isSpiking ? 88 : 72 + jitter)));
      });

      setPackagePower(isSpiking ? +(28.4 + Math.random() * 4).toFixed(1) : +(13.8 + Math.random() * 1.8).toFixed(1));
      setTemperature(isSpiking ? +(47.2 + Math.random() * 2).toFixed(1) : +(41.4 + Math.random() * 1.2).toFixed(1));
    }, 1200);

    return () => clearInterval(interval);
  }, [isSpiking]);

  const triggerWorkload = () => {
    setIsSpiking(true);
    if (onSimulateWorkload) onSimulateWorkload();
    setTimeout(() => setIsSpiking(false), 5000);
  };

  const avgPLoad = Math.round(coreLoads.slice(0, 6).reduce((a, b) => a + b, 0) / 6);
  const avgELoad = Math.round(coreLoads.slice(6, 12).reduce((a, b) => a + b, 0) / 6);
  const totalLoad = Math.round((avgPLoad * 6 + avgELoad * 6) / 12);

  return (
    <div className="space-y-3.5 text-xs text-zinc-300 font-mono">
      {/* Hardware Header Card */}
      <div className="p-3 rounded-lg border border-white/10 bg-[#12141e]/90 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">Apple M3 Pro</span>
                <span className="px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 text-[10px] border border-violet-500/30">
                  12-Core SoC
                </span>
                <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[10px] border border-cyan-500/30">
                  ARM64 · 3nm
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-sans">
                6 Performance Cores @ 4.05GHz · 6 Efficiency Cores @ 2.75GHz
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={triggerWorkload}
            disabled={isSpiking}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
              isSpiking
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse"
                : "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 active:scale-95"
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>{isSpiking ? "Simulating ML Train Loop..." : "Benchmark Cores"}</span>
          </button>
        </div>

        {/* Real-time Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 text-[11px]">
          <div className="bg-black/40 p-2 rounded border border-white/5">
            <span className="text-zinc-500 block text-[10px]">CPU UTILIZATION</span>
            <span className="text-white font-bold text-sm">{totalLoad}%</span>
            <span className="text-zinc-400 text-[10px] block">
              P-Avg: {avgPLoad}% · E-Avg: {avgELoad}%
            </span>
          </div>

          <div className="bg-black/40 p-2 rounded border border-white/5">
            <span className="text-zinc-500 block text-[10px]">16-CORE NEURAL ENGINE</span>
            <span className="text-emerald-400 font-bold text-sm">{npuLoad}% NPU</span>
            <span className="text-zinc-400 text-[10px] block">18 TOPS ML Accelerator</span>
          </div>

          <div className="bg-black/40 p-2 rounded border border-white/5">
            <span className="text-zinc-500 block text-[10px]">UNIFIED MEMORY</span>
            <span className="text-cyan-400 font-bold text-sm">
              {ramUsed} GB <span className="text-xs text-zinc-400 font-normal">/ 36 GB</span>
            </span>
            <span className="text-zinc-400 text-[10px] block">150 GB/s Bandwidth</span>
          </div>

          <div className="bg-black/40 p-2 rounded border border-white/5">
            <span className="text-zinc-500 block text-[10px]">THERMAL &amp; POWER</span>
            <span className="text-amber-400 font-bold text-sm">{packagePower}W</span>
            <span className="text-zinc-400 text-[10px] block">
              {temperature}°C · 0 RPM (Silent)
            </span>
          </div>
        </div>
      </div>

      {/* 12-Core Load Visualizer */}
      <div className="p-3 rounded-lg border border-white/10 bg-[#12141e]/90 space-y-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-zinc-200 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Per-Core Activity Meters</span>
          </span>
          <span className="text-zinc-500 text-[10px]">Live sampling (1.2s cadence)</span>
        </div>

        {/* 6 Performance Cores */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="text-amber-300 font-semibold">Performance Cores (P1 - P6)</span>
            <span>4.05 GHz Boost Limit</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {coreLoads.slice(0, 6).map((load, idx) => (
              <div
                key={`p-core-${idx}`}
                className="bg-black/50 px-2 py-1.5 rounded border border-white/5 flex items-center justify-between gap-2"
              >
                <span className="text-zinc-400 text-[10px] font-bold">P{idx + 1}</span>
                <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      load > 85
                        ? "bg-rose-500"
                        : load > 65
                        ? "bg-amber-400"
                        : "bg-emerald-400"
                    }`}
                    style={{ width: `${load}%` }}
                  />
                </div>
                <span className="text-[10px] text-zinc-300 font-mono w-7 text-right">
                  {load}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Efficiency Cores */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="text-cyan-300 font-semibold">Efficiency Cores (E1 - E6)</span>
            <span>2.75 GHz Sustained</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {coreLoads.slice(6, 12).map((load, idx) => (
              <div
                key={`e-core-${idx}`}
                className="bg-black/50 px-2 py-1.5 rounded border border-white/5 flex items-center justify-between gap-2"
              >
                <span className="text-zinc-400 text-[10px] font-bold">E{idx + 1}</span>
                <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-cyan-400 transition-all duration-700"
                    style={{ width: `${load}%` }}
                  />
                </div>
                <span className="text-[10px] text-zinc-300 font-mono w-7 text-right">
                  {load}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Process Table (htop style) */}
      <div className="p-3 rounded-lg border border-white/10 bg-[#12141e]/90 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-zinc-200 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span>Active Engineering Processes (htop / top)</span>
          </span>
          <span className="text-[10px] text-emerald-400">5 Services Online</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-zinc-500 text-[10px]">
                <th className="py-1 pr-2">PID</th>
                <th className="py-1 pr-2">COMMAND</th>
                <th className="py-1 pr-2 text-right">CPU%</th>
                <th className="py-1 pr-2 text-right">MEM%</th>
                <th className="py-1 pr-2 text-center">TH</th>
                <th className="py-1 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5">
                <td className="py-1 pr-2 text-zinc-500">1092</td>
                <td className="py-1 pr-2 font-semibold text-emerald-300">
                  xgboost-attack-model.py
                </td>
                <td className="py-1 pr-2 text-right text-white font-mono">
                  {isSpiking ? "78.4%" : "44.2%"}
                </td>
                <td className="py-1 pr-2 text-right text-zinc-400 font-mono">12.8%</td>
                <td className="py-1 pr-2 text-center text-zinc-400">16</td>
                <td className="py-1 text-right">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] border border-emerald-500/30">
                    TRAINING
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-white/5">
                <td className="py-1 pr-2 text-zinc-500">2144</td>
                <td className="py-1 pr-2 font-semibold text-cyan-300">
                  spring-boot-server.jar
                </td>
                <td className="py-1 pr-2 text-right text-white font-mono">8.4%</td>
                <td className="py-1 pr-2 text-right text-zinc-400 font-mono">7.2%</td>
                <td className="py-1 pr-2 text-center text-zinc-400">32</td>
                <td className="py-1 text-right">
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[9px] border border-cyan-500/30">
                    LISTENING
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-white/5">
                <td className="py-1 pr-2 text-zinc-500">3280</td>
                <td className="py-1 pr-2 font-semibold text-violet-300">
                  vite-client-runtime
                </td>
                <td className="py-1 pr-2 text-right text-white font-mono">14.6%</td>
                <td className="py-1 pr-2 text-right text-zinc-400 font-mono">4.1%</td>
                <td className="py-1 pr-2 text-center text-zinc-400">20</td>
                <td className="py-1 text-right">
                  <span className="px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 text-[9px] border border-violet-500/30">
                    ACTIVE HMR
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-white/5">
                <td className="py-1 pr-2 text-zinc-500">4012</td>
                <td className="py-1 pr-2 font-semibold text-emerald-400">
                  matrix-rain-core.wasm
                </td>
                <td className="py-1 pr-2 text-right text-white font-mono">3.2%</td>
                <td className="py-1 pr-2 text-right text-zinc-400 font-mono">1.2%</td>
                <td className="py-1 pr-2 text-center text-zinc-400">4</td>
                <td className="py-1 text-right">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] border border-emerald-500/30">
                    GPU STREAM
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-white/5">
                <td className="py-1 pr-2 text-zinc-500">5120</td>
                <td className="py-1 pr-2 font-semibold text-zinc-300">
                  zsh-pty-session
                </td>
                <td className="py-1 pr-2 text-right text-white font-mono">0.6%</td>
                <td className="py-1 pr-2 text-right text-zinc-400 font-mono">0.4%</td>
                <td className="py-1 pr-2 text-center text-zinc-400">2</td>
                <td className="py-1 text-right">
                  <span className="px-1.5 py-0.5 rounded bg-zinc-500/20 text-zinc-300 text-[9px] border border-zinc-500/30">
                    INTERACTIVE
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
