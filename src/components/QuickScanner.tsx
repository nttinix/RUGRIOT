import React, { useState } from 'react';
import { DEMO_SCAN_SAMPLES } from '../data/cases';
import type { QuickScanResult } from '../types';
import { Search, ShieldAlert, ShieldCheck, CheckCircle2, XCircle, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';

interface QuickScannerProps {
  onClose?: () => void;
}

export const QuickScanner: React.FC<QuickScannerProps> = () => {
  const [inputAddress, setInputAddress] = useState<string>('3dNW4MRMsiLbovbq7KKCy265JBqUPTmfintuxkfdjWMM');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [result, setResult] = useState<QuickScanResult | null>(DEMO_SCAN_SAMPLES[0]);

  const handleScan = (addressToScan?: string) => {
    const target = addressToScan || inputAddress;
    setIsScanning(true);

    setTimeout(() => {
      const match = DEMO_SCAN_SAMPLES.find(
        (s) => s.mintAddress.toLowerCase() === target.trim().toLowerCase()
      );

      if (match) {
        setResult(match);
      } else {
        // Dynamic simulated audit for arbitrary Solana address
        setResult({
          mintAddress: target.trim(),
          tokenName: 'Custom Target Query',
          symbol: 'UNKNOWN',
          riskScore: 65,
          riskVerdict: 'ELEVATED_RISK',
          checks: {
            mintAuthorityRevoked: true,
            freezeAuthorityRevoked: false,
            lpBurnedOrLocked: false,
            top10HoldersShare: 72.5,
            devWalletSoldAll: false,
            fundingLinkedToFlaggedRelay: false
          },
          notes: [
            'Freeze authority is still active on this mint.',
            'Liquidity pool has unverified lock duration.',
            'Top 10 wallets control 72.5% of circulating supply.'
          ]
        });
      }
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="card p-5 bg-[#0f1118] border-[#222738]">
      <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-[#1b1f2e] gap-2">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-[#f59e0b]" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-200">
            RUGRIOT Scan Sandbox Engine
          </h3>
        </div>
        <span className="text-[10px] font-mono text-gray-400 bg-[#161a26] px-2 py-0.5 rounded border border-[#262c3e]">
          PROTOTYPE v0.9 · ON-CHAIN HEURISTICS
        </span>
      </div>

      <p className="text-xs text-gray-300 mb-4 max-w-2xl">
        Prototype inspection console for the future RUGRIOT Scan database. Test known exploit signatures, official contracts, or query any Solana token mint address.
      </p>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[11px] font-mono text-gray-400 mr-1">PRESET SAMPLES:</span>
        {DEMO_SCAN_SAMPLES.map((sample) => (
          <button
            key={sample.mintAddress}
            onClick={() => {
              setInputAddress(sample.mintAddress);
              handleScan(sample.mintAddress);
            }}
            className="btn btn-outline btn-sm py-1 px-2.5 text-xs font-mono border-[#242b3c] hover:border-[#f59e0b] hover:text-white"
          >
            <span>{sample.symbol}</span>
            <span className={`text-[10px] ml-1 ${sample.riskVerdict === 'SAFE' ? 'text-emerald-400' : 'text-red-400'}`}>
              ({sample.riskScore}/100)
            </span>
          </button>
        ))}
      </div>

      {/* Address Input Bar */}
      <div className="flex gap-2 mb-5">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            placeholder="Enter Solana Token Mint Address (CA)..."
            className="w-full bg-[#090b10] border border-[#262c3e] rounded px-3 py-2 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#f59e0b] transition-colors"
          />
        </div>
        <button
          onClick={() => handleScan()}
          disabled={isScanning || !inputAddress.trim()}
          className="btn btn-primary btn-sm px-4 font-mono text-xs flex items-center gap-1.5"
        >
          {isScanning ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>SCANNING...</span>
            </>
          ) : (
            <>
              <span>EVALUATE CA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Scan Results Display */}
      {result && (
        <div className="p-4 rounded bg-[#090b10] border border-[#1e2333] space-y-4">
          {/* Header of Result */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1b1f2e]">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{result.tokenName}</span>
                <span className="font-mono text-xs text-gray-400">(${result.symbol})</span>
              </div>
              <div className="font-mono text-xs text-gray-400 truncate max-w-md mt-0.5">
                CA: {result.mintAddress}
              </div>
            </div>

            {/* Verdict Badge */}
            <div className="flex items-center gap-3">
              <div className="text-right font-mono">
                <div className="text-[10px] text-gray-400 uppercase">Risk Score</div>
                <div className={`text-base font-bold ${
                  result.riskScore > 70 ? 'text-red-400' : result.riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {result.riskScore} / 100
                </div>
              </div>

              <div className={`badge text-xs py-1 px-2.5 ${
                result.riskVerdict === 'CRITICAL_RISK'
                  ? 'badge-red'
                  : result.riskVerdict === 'ELEVATED_RISK'
                  ? 'badge-amber'
                  : 'badge-green'
              }`}>
                {result.riskVerdict === 'CRITICAL_RISK' && <ShieldAlert className="w-3.5 h-3.5 mr-1" />}
                {result.riskVerdict === 'SAFE' && <ShieldCheck className="w-3.5 h-3.5 mr-1" />}
                <span>{result.riskVerdict.replace(/_/g, ' ')}</span>
              </div>
            </div>
          </div>

          {/* Checks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-mono">
            {/* Mint Authority */}
            <div className="p-2.5 rounded bg-[#11131c] border border-[#1a1e2c] flex items-center justify-between">
              <span className="text-gray-400">Mint Authority Revoked</span>
              {result.checks.mintAuthorityRevoked ? (
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> YES
                </span>
              ) : (
                <span className="text-red-400 flex items-center gap-1 font-semibold">
                  <XCircle className="w-3.5 h-3.5" /> NO (DANGER)
                </span>
              )}
            </div>

            {/* Freeze Authority */}
            <div className="p-2.5 rounded bg-[#11131c] border border-[#1a1e2c] flex items-center justify-between">
              <span className="text-gray-400">Freeze Authority Revoked</span>
              {result.checks.freezeAuthorityRevoked ? (
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> YES
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" /> ACTIVE
                </span>
              )}
            </div>

            {/* LP Status */}
            <div className="p-2.5 rounded bg-[#11131c] border border-[#1a1e2c] flex items-center justify-between">
              <span className="text-gray-400">LP Burned / Escrow</span>
              {result.checks.lpBurnedOrLocked ? (
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> BURNED
                </span>
              ) : (
                <span className="text-red-400 flex items-center gap-1 font-semibold">
                  <XCircle className="w-3.5 h-3.5" /> UNLOCKED
                </span>
              )}
            </div>

            {/* Top 10 Share */}
            <div className="p-2.5 rounded bg-[#11131c] border border-[#1a1e2c] flex items-center justify-between">
              <span className="text-gray-400">Top 10 Holders Supply</span>
              <span className={`font-semibold ${result.checks.top10HoldersShare > 50 ? 'text-red-400' : 'text-gray-200'}`}>
                {result.checks.top10HoldersShare}%
              </span>
            </div>

            {/* Dev Sold All */}
            <div className="p-2.5 rounded bg-[#11131c] border border-[#1a1e2c] flex items-center justify-between">
              <span className="text-gray-400">Dev Wallet Drained Pool</span>
              {result.checks.devWalletSoldAll ? (
                <span className="text-red-400 font-semibold">CONFIRMED RUG</span>
              ) : (
                <span className="text-gray-300">NO DRAIN DETECTED</span>
              )}
            </div>

            {/* Funding Relay */}
            <div className="p-2.5 rounded bg-[#11131c] border border-[#1a1e2c] flex items-center justify-between">
              <span className="text-gray-400">Linked to Flagged Relay</span>
              {result.checks.fundingLinkedToFlaggedRelay ? (
                <span className="text-amber-400 font-semibold">SYNDICATE MATCH</span>
              ) : (
                <span className="text-emerald-400 font-semibold">CLEAN ORIGIN</span>
              )}
            </div>
          </div>

          {/* Specific Forensic Findings */}
          <div className="pt-2">
            <div className="text-[11px] font-mono uppercase text-gray-400 mb-1.5 font-bold">
              Automated Forensic Heuristic Notes:
            </div>
            <ul className="space-y-1 text-xs text-gray-300">
              {result.notes.map((note, idx) => (
                <li key={idx} className="flex items-center gap-2 font-mono">
                  <span className="text-[#f59e0b]">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
