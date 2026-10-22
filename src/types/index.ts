export type ExploitCategory = 
  | 'LIQUIDITY_DRAIN' 
  | 'FUNDING_RELAY' 
  | 'WASH_TRADING_BOTS';

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'SUSPICIOUS';

export interface TimelineEvent {
  id: string;
  timestamp: string;
  relativeTime: string;
  title: string;
  description: string;
  txHash: string;
  sourceWallet: string;
  targetWallet?: string;
  amountSol?: string;
  actionType: 'POOL_INIT' | 'FUNDING_TRANSFER' | 'BUY_VOLUME' | 'LIQUIDITY_REMOVED' | 'DRAIN' | 'CO_SIGN';
  highlight?: boolean;
}

export interface WalletNode {
  id: string;
  label: string;
  address: string;
  role: 'DEPLOYER' | 'FUNDING_RELAY' | 'SECONDARY' | 'POOL' | 'RECEIVER' | 'BOT_SIGNER';
  balanceSol?: string;
  x: number;
  y: number;
}

export interface WalletLink {
  source: string;
  target: string;
  label: string;
  amount: string;
  txHash: string;
  direction?: 'forward' | 'bidirectional';
}

export interface VerifiedTransaction {
  id: string;
  signature: string;
  slot: number;
  blockTimeUtc: string;
  type: string;
  signer: string;
  transferredSol: string;
  program: string;
  verifiedRpc: boolean;
  notes: string;
}

export interface DeliverablesConfig {
  deliverable1_projectInfo: {
    projectName: string;
    network: string;
    mintCA: string;
    deployer: string;
    launchTimestamp: string;
    poolType: string;
  };
  deliverable2_walletInvestigation: string[];
  deliverable3_suspiciousEvidence: string[];
  deliverable4_summary: string;
  deliverable5_verificationSteps: string[];
}

export interface InvestigationCase {
  id: string;
  caseNumber: string;
  name: string;
  symbol: string;
  mintAddress: string;
  network: string;
  launchDate: string;
  exploitCategory: ExploitCategory;
  riskLevel: RiskLevel;
  headline: string;
  extractedSol: string;
  reserveLeftSol: string;
  deployerAddress: string;
  poolAddress: string;
  summaryFacts: string[];
  riskInterpretation: string[];
  boundariesAndLimits: string;
  timeline: TimelineEvent[];
  walletNodes: WalletNode[];
  walletLinks: WalletLink[];
  transactions: VerifiedTransaction[];
  deliverables: DeliverablesConfig;
}

export interface QuickScanResult {
  mintAddress: string;
  tokenName: string;
  symbol: string;
  riskScore: number; // 0 - 100
  riskVerdict: 'SAFE' | 'ELEVATED_RISK' | 'CRITICAL_RISK';
  checks: {
    mintAuthorityRevoked: boolean;
    freezeAuthorityRevoked: boolean;
    lpBurnedOrLocked: boolean;
    top10HoldersShare: number;
    devWalletSoldAll: boolean;
    fundingLinkedToFlaggedRelay: boolean;
  };
  notes: string[];
}
