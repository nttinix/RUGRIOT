import React, { useState } from 'react';
import { INVESTIGATION_CASES } from './data/cases';
import { Header } from './components/Header';
import { CaseSelector } from './components/CaseSelector';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { WalletFlowGraph } from './components/WalletFlowGraph';
import { TimelinePlayer } from './components/TimelinePlayer';
import { TransactionLedger } from './components/TransactionLedger';
import { AuditReportView } from './components/AuditReportView';
import { QuickScanner } from './components/QuickScanner';
import { ExportModal } from './components/ExportModal';
import { LayoutDashboard, GitBranch, Clock, Database, FileCheck, Search, ExternalLink } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return p.get('case') || 'case-01';
    }
    return 'case-01';
  });
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TOPOLOGY' | 'TIMELINE' | 'LEDGER' | 'REPORT' | 'SCANNER'>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const t = p.get('tab')?.toUpperCase();
      if (t && ['OVERVIEW', 'TOPOLOGY', 'TIMELINE', 'LEDGER', 'REPORT', 'SCANNER'].includes(t)) {
        return t as any;
      }
    }
    return 'OVERVIEW';
  });
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const currentCase = INVESTIGATION_CASES.find((c) => c.id === selectedCaseId) || INVESTIGATION_CASES[0];

  const handleSelectCase = (id: string) => {
    setSelectedCaseId(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('case', id);
      window.history.replaceState({}, '', url.toString());
    }
    if (activeTab === 'SCANNER') {
      setActiveTab('OVERVIEW');
    }
  };

  const handleSelectTab = (tab: 'OVERVIEW' | 'TOPOLOGY' | 'TIMELINE' | 'LEDGER' | 'REPORT' | 'SCANNER') => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const tabs = [
    { id: 'OVERVIEW', label: 'Executive Dossier', icon: LayoutDashboard },
    { id: 'TOPOLOGY', label: 'Wallet Topology', icon: GitBranch },
    { id: 'TIMELINE', label: 'Timeline Replay', icon: Clock },
    { id: 'LEDGER', label: 'Verified Signatures', icon: Database },
    { id: 'REPORT', label: 'Bounty Deliverables', icon: FileCheck },
    { id: 'SCANNER', label: 'RUGRIOT Scanner', icon: Search },
  ] as const;

  return (
    <div className="min-h-screen bg-[#08090d] text-gray-100 flex flex-col">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenScanner={() => setActiveTab('SCANNER')}
        onExport={() => setIsExportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 app-container">
        {/* Case Switcher Tabs */}
        <CaseSelector
          cases={INVESTIGATION_CASES}
          selectedCaseId={selectedCaseId}
          onSelectCase={handleSelectCase}
        />

        {/* View Navigation Sub-Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-5 border-b border-[#1c202e] text-xs font-mono">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#181d2a] text-[#f59e0b] border border-[#f59e0b]/40'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#121520]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#f59e0b]' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic View Panels */}
        <div className="space-y-6">
          {activeTab === 'OVERVIEW' && (
            <>
              <ExecutiveSummary currentCase={currentCase} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
                <WalletFlowGraph nodes={currentCase.walletNodes} links={currentCase.walletLinks} />
                <TimelinePlayer events={currentCase.timeline} />
              </div>
              <TransactionLedger transactions={currentCase.transactions} />
            </>
          )}

          {activeTab === 'TOPOLOGY' && (
            <div className="space-y-4">
              <WalletFlowGraph nodes={currentCase.walletNodes} links={currentCase.walletLinks} />
              <ExecutiveSummary currentCase={currentCase} />
            </div>
          )}

          {activeTab === 'TIMELINE' && (
            <div className="space-y-4">
              <TimelinePlayer events={currentCase.timeline} />
              <TransactionLedger transactions={currentCase.transactions} />
            </div>
          )}

          {activeTab === 'LEDGER' && (
            <div className="space-y-4">
              <TransactionLedger transactions={currentCase.transactions} />
              <ExecutiveSummary currentCase={currentCase} />
            </div>
          )}

          {activeTab === 'REPORT' && (
            <AuditReportView currentCase={currentCase} />
          )}

          {activeTab === 'SCANNER' && (
            <QuickScanner />
          )}
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="border-t border-[#1b1f2e] bg-[#090b10] py-6 px-5 text-xs font-mono text-gray-400 mt-12">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-gray-300 font-semibold mb-1">
              <span>RUGRIOT INTEL CONSOLE</span>
              <span className="text-gray-600">·</span>
              <span className="text-emerald-400">PUMP.FUN GO BOUNTY CHALLENGE</span>
            </div>
            <p className="text-[11px] text-gray-400 font-sans">
              Task ID: 11e1d97d-f3b7-450d-b09b-368c9268d615 | On-Chain Bounty ID: 1188632030353691843
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://pump.fun/go/11e1d97d-f3b7-450d-b09b-368c9268d615"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[#f59e0b] flex items-center gap-1 transition-colors"
            >
              <span>View Bounty on Pump.fun</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-gray-700">|</span>
            <span className="text-gray-400">Deployable on Vercel</span>
          </div>
        </div>
      </footer>

      {/* Export Modal */}
      <ExportModal
        currentCase={currentCase}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
};

export default App;
