import React, { useState } from 'react';
import type { InvestigationCase } from '../types';
import { FileText, Copy, Check, Download, ShieldCheck } from 'lucide-react';

interface AuditReportViewProps {
  currentCase: InvestigationCase;
}

export const AuditReportView: React.FC<AuditReportViewProps> = ({ currentCase }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const del = currentCase.deliverables;

  const generateMarkdown = () => {
    return `# RUGRIOT RUG HUNTERS // AUDIT REPORT: CASE #${currentCase.caseNumber}
## Target: ${currentCase.name} (${currentCase.symbol})
*Public Blockchain Evidence Only · Zero Doxxing / Zero PII · Cryptographic Verification Level 1*

---

### [Deliverable #1 — Project Information]
- **Project Name:** ${del.deliverable1_projectInfo.projectName}
- **Network:** ${del.deliverable1_projectInfo.network}
- **Token Contract Address (CA):** \`${del.deliverable1_projectInfo.mintCA}\`
- **Deployer Wallet Address:** \`${del.deliverable1_projectInfo.deployer}\`
- **Pool Type:** ${del.deliverable1_projectInfo.poolType}
- **Launch Timestamp:** ${del.deliverable1_projectInfo.launchTimestamp}

---

### [Deliverable #2 — Wallet Investigation & Observed Pattern]
${del.deliverable2_walletInvestigation.map((w, i) => `${i + 1}. ${w}`).join('\n')}

---

### [Deliverable #3 — Evidence of Suspicious Activity]
${del.deliverable3_suspiciousEvidence.map((e) => `- ${e}`).join('\n')}

**Key Evidence Signatures:**
${currentCase.transactions.map((tx) => `- **${tx.type}**: \`${tx.signature}\` (${tx.transferredSol})`).join('\n')}

---

### [Deliverable #4 — Investigation Summary]
${del.deliverable4_summary}

---

### [Deliverable #5 — Verification & Reproducibility Steps]
${del.deliverable5_verificationSteps.map((v, i) => `${i + 1}. ${v}`).join('\n')}

---
*Report generated for RUGRIOT Rug Hunters Bounty Challenge.*
`;
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdownFile = () => {
    const text = generateMarkdown();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RUGRIOT_AUDIT_REPORT_CASE_${currentCase.caseNumber}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="card p-5 bg-[#0f1118] border-[#222738]">
      <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-[#1b1f2e] gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#f59e0b]" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-200">
            Formal Bounty Deliverables Report (Format Compliant)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyMarkdown}
            className="btn btn-outline btn-sm text-xs border-[#2a3144] text-gray-200 hover:text-white flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY MARKDOWN'}</span>
          </button>

          <button
            onClick={downloadMarkdownFile}
            className="btn btn-primary btn-sm text-xs font-mono flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD .MD REPORT</span>
          </button>
        </div>
      </div>

      {/* Styled Printable / Formatted View */}
      <div className="p-6 rounded bg-[#090b10] border border-[#1b1f2e] space-y-6 text-sm text-gray-300 font-sans leading-relaxed">
        
        {/* Deliverable 1 */}
        <section>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#f59e0b] mb-2 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
            <span>Deliverable #1 — Project Information</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded bg-[#11131c] border border-[#1a1e2c] font-mono text-xs">
            <div>
              <span className="text-gray-400">Project Name:</span> <span className="text-gray-100">{del.deliverable1_projectInfo.projectName}</span>
            </div>
            <div>
              <span className="text-gray-400">Network:</span> <span className="text-gray-100">{del.deliverable1_projectInfo.network}</span>
            </div>
            <div className="truncate">
              <span className="text-gray-400">Token CA:</span> <span className="text-emerald-400">{del.deliverable1_projectInfo.mintCA}</span>
            </div>
            <div className="truncate">
              <span className="text-gray-400">Deployer:</span> <span className="text-gray-200">{del.deliverable1_projectInfo.deployer}</span>
            </div>
            <div>
              <span className="text-gray-400">Pool Type:</span> <span className="text-gray-200">{del.deliverable1_projectInfo.poolType}</span>
            </div>
            <div>
              <span className="text-gray-400">Launch Date:</span> <span className="text-gray-200">{del.deliverable1_projectInfo.launchTimestamp}</span>
            </div>
          </div>
        </section>

        {/* Deliverable 2 */}
        <section>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#f59e0b] mb-2 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
            <span>Deliverable #2 — Wallet Investigation & Observed Pattern</span>
          </div>
          <div className="p-3.5 rounded bg-[#11131c] border border-[#1a1e2c] space-y-2 text-xs">
            {del.deliverable2_walletInvestigation.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="font-mono text-gray-400 font-bold">{idx + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverable 3 */}
        <section>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#f59e0b] mb-2 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
            <span>Deliverable #3 — Evidence of Suspicious Activity</span>
          </div>
          <div className="p-3.5 rounded bg-[#11131c] border border-[#1a1e2c] space-y-2 text-xs">
            {del.deliverable3_suspiciousEvidence.map((ev, idx) => (
              <div key={idx} className="flex items-start gap-2 text-red-200">
                <span className="text-red-400 font-bold">•</span>
                <span>{ev}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverable 4 */}
        <section>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#f59e0b] mb-2 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
            <span>Deliverable #4 — Investigation Summary</span>
          </div>
          <div className="p-3.5 rounded bg-[#11131c] border border-[#1a1e2c] text-xs text-gray-200">
            {del.deliverable4_summary}
          </div>
        </section>

        {/* Deliverable 5 */}
        <section>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#f59e0b] mb-2 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
            <span>Deliverable #5 — Verification & Reproducibility</span>
          </div>
          <div className="p-3.5 rounded bg-[#11131c] border border-[#1a1e2c] space-y-1.5 text-xs font-mono text-gray-300">
            {del.deliverable5_verificationSteps.map((step, idx) => (
              <div key={idx} className="text-emerald-300">
                $ {step}
              </div>
            ))}
          </div>
        </section>

        {/* Compliance Seal */}
        <div className="pt-3 border-t border-[#1a1e2c] flex items-center justify-between text-[11px] font-mono text-gray-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>COMPLIANT WITH PUMP.FUN SAFETY & INTEGRITY POLICIES</span>
          </div>
          <span>Case #{currentCase.caseNumber} Completed</span>
        </div>

      </div>
    </div>
  );
};
