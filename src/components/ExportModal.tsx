import React, { useState } from 'react';
import type { InvestigationCase } from '../types';
import { X, Download, Copy, Check, FileJson, FileText, Printer } from 'lucide-react';

interface ExportModalProps {
  currentCase: InvestigationCase;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ currentCase, isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const downloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentCase, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `RUGRIOT_CASE_${currentCase.caseNumber}_EVIDENCE.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const downloadMarkdown = () => {
    const mdContent = `# RUGRIOT RUG HUNTERS // AUDIT DOSSIER
## Case #${currentCase.caseNumber}: ${currentCase.name} (${currentCase.symbol})
Mint: ${currentCase.mintAddress}
Extracted: ${currentCase.extractedSol}
Severity: ${currentCase.riskLevel}

### Verified Facts:
${currentCase.summaryFacts.map((f, i) => `${i + 1}. ${f}`).join('\n')}

### Verified Transactions:
${currentCase.transactions.map((t) => `- [${t.type}] Sig: ${t.signature} | Slot: ${t.slot} | SOL: ${t.transferredSol}`).join('\n')}
`;
    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RUGRIOT_CASE_${currentCase.caseNumber}_DOSSIER.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(currentCase, null, 2));
    setCopiedType('json');
    setTimeout(() => setCopiedType(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl card p-5 bg-[#0f1118] border-[#2b3248] shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#1f2434] mb-4">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-[#f59e0b]" />
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              Export Forensic Evidence Package
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-[#1a1f2e] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-300 mb-4 leading-relaxed">
          Export the cryptographic investigation records for <strong className="text-white">Case #{currentCase.caseNumber} ({currentCase.name})</strong>. Formatted for peer review, on-chain archiving, and bounty submission compliance.
        </p>

        <div className="space-y-3 font-mono text-xs">
          {/* Format 1: Markdown Submission */}
          <div className="p-3.5 rounded bg-[#121520] border border-[#212638] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#f59e0b]" />
              <div>
                <div className="text-gray-200 font-semibold">Standard Bounty Markdown (.md)</div>
                <div className="text-[11px] text-gray-400 font-sans">Ready to paste directly into Pump.fun submission forms</div>
              </div>
            </div>
            <button
              onClick={downloadMarkdown}
              className="btn btn-outline btn-sm text-xs border-[#2c3348] hover:border-[#f59e0b] hover:text-white"
            >
              Download .md
            </button>
          </div>

          {/* Format 2: JSON Payload */}
          <div className="p-3.5 rounded bg-[#121520] border border-[#212638] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileJson className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-gray-200 font-semibold">Raw Forensic JSON Payload (.json)</div>
                <div className="text-[11px] text-gray-400 font-sans">Complete schema matching RUGRIOT Scan database</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copyJson}
                className="btn btn-outline btn-sm text-xs border-[#2c3348] hover:text-white"
                title="Copy raw JSON"
              >
                {copiedType === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={downloadJson}
                className="btn btn-outline btn-sm text-xs border-[#2c3348] hover:border-blue-400 hover:text-white"
              >
                Download .json
              </button>
            </div>
          </div>

          {/* Format 3: Print Friendly */}
          <div className="p-3.5 rounded bg-[#121520] border border-[#212638] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Printer className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-gray-200 font-semibold">Browser Print / PDF Generator</div>
                <div className="text-[11px] text-gray-400 font-sans">Render a clean printable report page</div>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="btn btn-outline btn-sm text-xs border-[#2c3348] hover:border-emerald-400 hover:text-white"
            >
              Print / Save PDF
            </button>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-[#1a1f2e] flex justify-end">
          <button
            onClick={onClose}
            className="btn btn-outline btn-sm px-4 text-xs font-mono border-[#283044]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
