import React from 'react';
import type { InvestigationCase } from '../types';
import { AlertOctagon, GitCommit, RefreshCw } from 'lucide-react';

interface CaseSelectorProps {
  cases: InvestigationCase[];
  selectedCaseId: string;
  onSelectCase: (caseId: string) => void;
}

export const CaseSelector: React.FC<CaseSelectorProps> = ({
  cases,
  selectedCaseId,
  onSelectCase,
}) => {
  return (
    <div className="mt-6 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-2">
          <span>Active Investigation Dossiers</span>
          <span className="text-[10px] bg-[#1a1e2b] px-1.5 py-0.5 rounded text-gray-400 border border-[#2a3044]">
            {cases.length} VERIFIED CASES
          </span>
        </h2>
        <span className="text-xs text-gray-400 font-mono hidden md:inline">
          Select dossier to load full telemetry & on-chain proofs
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {cases.map((c) => {
          const isSelected = c.id === selectedCaseId;
          const isCritical = c.riskLevel === 'CRITICAL';

          return (
            <button
              key={c.id}
              onClick={() => onSelectCase(c.id)}
              className={`text-left p-3.5 rounded border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-[#151926] border-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.08)]'
                  : 'bg-[#0f1118] border-[#222738] hover:border-[#353d56] hover:bg-[#131620]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#f59e0b]" />
              )}

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-gray-400">
                    CASE #{c.caseNumber}
                  </span>
                  <span className={`badge text-[10px] py-0 px-1.5 ${
                    isCritical ? 'badge-red' : 'badge-amber'
                  }`}>
                    {c.riskLevel}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-gray-400">
                  {c.exploitCategory === 'LIQUIDITY_DRAIN' && <AlertOctagon className="w-3.5 h-3.5 text-red-400" />}
                  {c.exploitCategory === 'FUNDING_RELAY' && <GitCommit className="w-3.5 h-3.5 text-amber-400" />}
                  {c.exploitCategory === 'WASH_TRADING_BOTS' && <RefreshCw className="w-3.5 h-3.5 text-blue-400" />}
                  <span>{c.exploitCategory.replace(/_/g, ' ')}</span>
                </div>
              </div>

              <div className="font-semibold text-sm text-gray-100 flex items-center justify-between">
                <span>{c.name}</span>
                <span className="font-mono text-xs text-[#f59e0b] font-medium">
                  {c.extractedSol}
                </span>
              </div>

              <p className="text-xs text-gray-400 mt-1 line-clamp-1 font-sans">
                {c.headline}
              </p>

              <div className="mt-2.5 pt-2 border-t border-[#1b1f2e] flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span className="truncate max-w-[170px]">
                  CA: {c.mintAddress.slice(0, 6)}...{c.mintAddress.slice(-4)}
                </span>
                <span className="text-emerald-400">
                  {c.transactions.length} Verified Txs
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
