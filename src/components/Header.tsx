import React from 'react';
import { Shield, Activity, Terminal, Search, Download } from 'lucide-react';

interface HeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: any) => void;
  onOpenScanner: () => void;
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenScanner, onExport }) => {
  return (
    <header className="border-b border-[#1b1e2a] bg-[#0b0c12] sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand & Context */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded bg-[#181b26] border border-[#f59e0b]/40 flex items-center justify-center text-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Shield className="w-5 h-5 text-[#f59e0b]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-base tracking-wider text-white">RUGRIOT</span>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30 font-semibold">
                FORENSIC LAB
              </span>
              <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">v1.2</span>
            </div>
            <p className="text-xs text-gray-400 font-sans mt-0.5">
              Solana Ecosystem On-Chain Investigation Console · Pump.fun GO Research Submission
            </p>
          </div>
        </div>

        {/* Status Indicators & Fast Actions */}
        <div className="flex items-center gap-3">
          {/* Network Health */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded bg-[#121520] border border-[#212638] text-xs font-mono">
            <span className="pulse-dot"></span>
            <span className="text-gray-300">SOLANA MAINNET</span>
            <span className="text-gray-500">|</span>
            <span className="text-emerald-400">SLOT #312,481,902</span>
          </div>

          {/* Quick Scanner Action */}
          <button
            onClick={onOpenScanner}
            className="btn btn-outline btn-sm text-xs border-[#2d3448] text-gray-200 hover:text-white hover:border-[#f59e0b] flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>RUG SCANNER SANDBOX</span>
          </button>

          {/* Export Action */}
          <button
            onClick={onExport}
            className="btn btn-primary btn-sm text-xs flex items-center gap-1.5 font-mono"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT DOSSIER</span>
          </button>
        </div>

      </div>

      {/* Sub-bar / Methodology Guarantee */}
      <div className="bg-[#0e1017] border-t border-[#181b26] px-5 py-1.5 text-[11px] font-mono text-gray-400 flex flex-wrap items-center justify-between">
        <div className="max-w-[1440px] mx-auto w-full flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <Activity className="w-3 h-3" /> 100% PUBLIC BLOCKCHAIN DATA
            </span>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-gray-400">ZERO PII / NO DOXXING</span>
            <span className="text-gray-600 hidden md:inline">|</span>
            <span className="hidden md:inline text-gray-400">CRYPTOGRAPHIC EVIDENCE LEVEL 1</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Terminal className="w-3 h-3 text-[#f59e0b]" />
            <span>RPC ENDPOINT: <span className="text-gray-300">api.mainnet-beta.solana.com</span></span>
          </div>
        </div>
      </div>
    </header>
  );
};
