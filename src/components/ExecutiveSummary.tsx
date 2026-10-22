import React, { useState } from 'react';
import type { InvestigationCase } from '../types';
import { Copy, Check, ExternalLink, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ExecutiveSummaryProps {
  currentCase: InvestigationCase;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ currentCase }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Top Dossier Metadata Card */}
      <div className="card p-5 bg-[#0f1118] border-[#222738]">
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#1b1f2e]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge badge-amber text-[10px]">CASE #{currentCase.caseNumber}</span>
              <span className="badge badge-neutral text-[10px]">{currentCase.network}</span>
              <span className={`badge text-[10px] ${currentCase.riskLevel === 'CRITICAL' ? 'badge-red' : 'badge-amber'}`}>
                {currentCase.riskLevel} SEVERITY
              </span>
            </div>
            <h1 className="text-xl font-bold text-white flex items-center gap-3">
              <span>{currentCase.name}</span>
              <span className="font-mono text-sm text-gray-400 font-normal">(${currentCase.symbol})</span>
            </h1>
            <p className="text-sm text-gray-300 mt-1 max-w-3xl">
              {currentCase.headline}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1 font-mono text-right">
            <span className="text-[11px] text-gray-400 uppercase">Capital Impact / Extracted</span>
            <span className="text-lg font-bold text-[#f59e0b]">{currentCase.extractedSol}</span>
            <span className="text-[11px] text-gray-400">
              Residual Reserve: <span className="text-red-400">{currentCase.reserveLeftSol}</span>
            </span>
          </div>
        </div>

        {/* Addresses Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 text-xs font-mono">
          {/* Mint CA */}
          <div className="p-2.5 rounded bg-[#131622] border border-[#1e2333] flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-gray-400 font-semibold">MINT CA:</span>
              <span className="text-gray-200 truncate">{currentCase.mintAddress}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
              <button
                onClick={() => copyToClipboard(currentCase.mintAddress, 'ca')}
                className="p-1 hover:text-white text-gray-400 transition-colors"
                title="Copy Address"
              >
                {copiedField === 'ca' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <a
                href={`https://solscan.io/token/${currentCase.mintAddress}`}
                target="_blank"
                rel="noreferrer"
                className="p-1 hover:text-white text-gray-400 transition-colors"
                title="View on Solscan"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Deployer Key */}
          <div className="p-2.5 rounded bg-[#131622] border border-[#1e2333] flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-gray-400 font-semibold">DEPLOYER:</span>
              <span className="text-gray-200 truncate">{currentCase.deployerAddress}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
              <button
                onClick={() => copyToClipboard(currentCase.deployerAddress, 'deployer')}
                className="p-1 hover:text-white text-gray-400 transition-colors"
                title="Copy Address"
              >
                {copiedField === 'deployer' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <a
                href={`https://solscan.io/account/${currentCase.deployerAddress}`}
                target="_blank"
                rel="noreferrer"
                className="p-1 hover:text-white text-gray-400 transition-colors"
                title="View on Solscan"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Verified Facts vs Risk Interpretation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Left Column: 100% Cryptographic Facts */}
        <div className="card p-4 bg-[#0f1118] border-[#222738]">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1b1f2e]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-200">
                Verified On-Chain Facts
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              AUDITED VIA RPC
            </span>
          </div>

          <ul className="space-y-2.5 text-xs text-gray-300">
            {currentCase.summaryFacts.map((fact, index) => (
              <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                <span className="font-mono text-emerald-400/80 font-bold mt-0.5 text-[11px]">
                  [0{index + 1}]
                </span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Technical Risk Interpretation */}
        <div className="card p-4 bg-[#0f1118] border-[#222738]">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1b1f2e]">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-200">
                Forensic Risk Assessment
              </h3>
            </div>
            <span className="text-[10px] font-mono text-amber-400 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              PATTERN MATCH
            </span>
          </div>

          <ul className="space-y-2.5 text-xs text-gray-300">
            {currentCase.riskInterpretation.map((risk, index) => (
              <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                <span className="font-mono text-amber-400/80 font-bold mt-0.5 text-[11px]">
                  !{index + 1}
                </span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Scope, Boundaries & Research Integrity Alert */}
      <div className="p-3.5 rounded bg-[#12141c] border border-[#1e2333] flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-gray-400 leading-relaxed">
          <span className="font-mono text-gray-300 font-semibold uppercase tracking-wider">
            Scope & Evidentiary Boundaries:{' '}
          </span>
          {currentCase.boundariesAndLimits}
          <span className="block mt-1 text-[11px] text-gray-400">
            Research compiled strictly from publicly verifiable Solana account balances, transaction instructions, and slot timestamps.
          </span>
        </div>
      </div>
    </div>
  );
};
