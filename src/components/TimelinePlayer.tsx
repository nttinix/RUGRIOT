import React, { useState, useEffect } from 'react';
import type { TimelineEvent } from '../types';
import { Clock, Play, Pause, ChevronRight, ChevronLeft, ExternalLink, ArrowRight } from 'lucide-react';

interface TimelinePlayerProps {
  events: TimelineEvent[];
}

export const TimelinePlayer: React.FC<TimelinePlayerProps> = ({ events }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % events.length);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, events.length]);

  const activeEvent = events[activeIndex] || events[0];

  return (
    <div className="card p-5 bg-[#0f1118] border-[#222738]">
      <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-[#1b1f2e] gap-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#f59e0b]" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-200">
            Chronological Exploit Timeline
          </h3>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn btn-outline btn-sm py-1 px-2.5 text-xs flex items-center gap-1.5 border-[#2c3348] text-gray-200 hover:border-[#f59e0b]"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isPlaying ? 'PAUSE' : 'AUTO-PLAY'}</span>
          </button>
          <button
            disabled={activeIndex === 0}
            onClick={() => { setIsPlaying(false); setActiveIndex((prev) => Math.max(0, prev - 1)); }}
            className="p-1.5 rounded border border-[#2c3348] text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-gray-400 px-1">
            {activeIndex + 1} / {events.length}
          </span>
          <button
            disabled={activeIndex === events.length - 1}
            onClick={() => { setIsPlaying(false); setActiveIndex((prev) => Math.min(events.length - 1, prev + 1)); }}
            className="p-1.5 rounded border border-[#2c3348] text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Track / Scrub Bar */}
      <div className="relative mb-6">
        <div className="h-1 bg-[#1a1e2b] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#f59e0b] transition-all duration-300"
            style={{ width: `${((activeIndex + 1) / events.length) * 100}%` }}
          />
        </div>

        {/* Milestone Steps Bar */}
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-1 mt-2">
          {events.map((ev, idx) => (
            <button
              key={ev.id}
              onClick={() => { setIsPlaying(false); setActiveIndex(idx); }}
              className={`text-left p-2 rounded border transition-all ${
                activeIndex === idx
                  ? 'bg-[#181c2b] border-[#f59e0b]'
                  : 'bg-[#12141c] border-[#1d2232] hover:border-[#2f374e]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                <span className={activeIndex === idx ? 'text-[#f59e0b] font-bold' : 'text-gray-400'}>
                  {ev.relativeTime}
                </span>
                {ev.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                )}
              </div>
              <div className="text-xs font-medium text-gray-200 truncate">
                {ev.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Event Detail Card */}
      <div className={`p-4 rounded border transition-all ${
        activeEvent.highlight
          ? 'bg-[#1c1214] border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.08)]'
          : 'bg-[#121520] border-[#222738]'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#222838]">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-[#f59e0b]">
              STEP 0{activeIndex + 1}
            </span>
            <span className="text-gray-600">|</span>
            <span className="font-mono text-xs text-gray-300">
              {activeEvent.timestamp} ({activeEvent.relativeTime})
            </span>
            <span className={`badge text-[10px] ${
              activeEvent.actionType === 'LIQUIDITY_REMOVED' || activeEvent.actionType === 'DRAIN'
                ? 'badge-red'
                : activeEvent.actionType === 'POOL_INIT'
                ? 'badge-blue'
                : 'badge-amber'
            }`}>
              {activeEvent.actionType}
            </span>
          </div>

          {activeEvent.amountSol && (
            <div className="font-mono text-xs font-bold text-[#f59e0b]">
              Amount: {activeEvent.amountSol}
            </div>
          )}
        </div>

        <h4 className="text-base font-semibold text-white mb-1.5">
          {activeEvent.title}
        </h4>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          {activeEvent.description}
        </p>

        {/* Source -> Target & Tx Signature */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono pt-3 border-t border-[#1e2436]">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-gray-400">From:</span>
            <span className="text-gray-200">{activeEvent.sourceWallet}</span>
            {activeEvent.targetWallet && (
              <>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-200">{activeEvent.targetWallet}</span>
              </>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 text-gray-400">
            <span className="text-gray-400">Tx:</span>
            <span className="text-gray-300 truncate max-w-[180px]">{activeEvent.txHash}</span>
            <a
              href={`https://solscan.io/tx/${activeEvent.txHash}`}
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 ml-1"
            >
              <span>Verify</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
