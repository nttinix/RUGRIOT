import type { InvestigationCase } from '../types';

export const INVESTIGATION_CASES: InvestigationCase[] = [
  {
    id: 'case-01',
    caseNumber: '001',
    name: 'LEVERAGE10 (Primary)',
    symbol: 'LEV10',
    mintAddress: '3dNW4MRMsiLbovbq7KKCy265JBqUPTmfintuxkfdjWMM',
    network: 'Solana Mainnet-Beta',
    launchDate: '2026-10-18 14:10:22 UTC',
    exploitCategory: 'LIQUIDITY_DRAIN',
    riskLevel: 'CRITICAL',
    headline: 'Near-Total Liquidity Reserve Extraction After 24m 49s',
    extractedSol: '525.200057044 SOL',
    reserveLeftSol: '0.000002587 SOL',
    deployerAddress: 'J7cFUBNjhgfktroSa9KRYm2WpBzw5Y3qJS94JtabUQXU',
    poolAddress: '7q2G9eQ7b3Z4zXqM9P41aK7f2T1nB8mD2W7q8vX3p4K9',
    summaryFacts: [
      'The mint creator initialized an automated liquidity pool with 85.00 SOL initial reserve.',
      '24 minutes and 49 seconds post-launch, the deploying wallet executed a complete remove-liquidity instruction.',
      '525.200057044 SOL were withdrawn directly to the deployer-controlled keypair.',
      'The pool wrapped-SOL reserve was reduced to 0.000002587 SOL, preventing any external holders from exiting positions.',
      'On-chain metadata and liquidity position ownership records confirm single-party control over the withdraw instruction.'
    ],
    riskInterpretation: [
      'The rapid time delta between pool initialization and withdrawal indicates a planned liquidity drain rather than an organic decommission.',
      'The retention of near-zero reserve balance confirms a destructive withdrawal pattern (Liquidity Rug).',
      'The extracted capital was systematically routed onward to secondary unverified accounts within two blocks.'
    ],
    boundariesAndLimits: 'Analysis is strictly restricted to verified on-chain account transitions. Total gross SOL extracted does not represent net investor loss due to unknown insider buy/sell wash fractions.',
    timeline: [
      {
        id: 't1-1',
        timestamp: '14:10:22 UTC',
        relativeTime: 'T+00:00',
        title: 'Mint & Metadata Initialization',
        description: 'Token mint created with 1,000,000,000 supply and initial metadata URI assigned.',
        txHash: '5xKp7P...8sCpz',
        sourceWallet: 'Deployer (J7cFU...)',
        actionType: 'POOL_INIT',
        highlight: false
      },
      {
        id: 't1-2',
        timestamp: '14:11:05 UTC',
        relativeTime: 'T+00:43',
        title: 'Initial Pool Seeding (85 SOL)',
        description: 'Deployer commits 85 SOL and 800M LEV10 into Raydium/Meteora liquidity vault.',
        txHash: '3wRq2T...9vM8n',
        sourceWallet: 'Deployer (J7cFU...)',
        targetWallet: 'Pool Vault (7q2G...)',
        amountSol: '85.00 SOL',
        actionType: 'POOL_INIT',
        highlight: false
      },
      {
        id: 't1-3',
        timestamp: '14:20:15 UTC',
        relativeTime: 'T+09:53',
        title: 'Retail Inflow & Volume Ingestion',
        description: 'Multiple external non-signers execute swaps, elevating pool reserve to 525.20 SOL.',
        txHash: '2bKm9V...4xZ1p',
        sourceWallet: 'External Traders',
        targetWallet: 'Pool Vault (7q2G...)',
        amountSol: '+440.20 SOL',
        actionType: 'BUY_VOLUME',
        highlight: false
      },
      {
        id: 't1-4',
        timestamp: '14:35:54 UTC',
        relativeTime: 'T+24:49',
        title: 'Complete Reserve Extraction (Exploit)',
        description: 'Deployer invokes liquidity burn and withdraws 525.20 SOL in a single atomic transaction.',
        txHash: '4X4p7PVZ9oKUUvenvaQcSfKA2u6s5ik268T3r9kGFjCeb8sCpzGD4QaMpbQhWmjvAPKe3i8CX4TmY7YmCavUTeYr',
        sourceWallet: 'Pool Vault (7q2G...)',
        targetWallet: 'Deployer (J7cFU...)',
        amountSol: '525.200057044 SOL',
        actionType: 'LIQUIDITY_REMOVED',
        highlight: true
      },
      {
        id: 't1-5',
        timestamp: '14:37:10 UTC',
        relativeTime: 'T+26:05',
        title: 'Onward Routing to Staging Address',
        description: 'Extracted balance partitioned into multiple 100-SOL tranches to secondary staging keys.',
        txHash: '4gHq7M...1pW9x',
        sourceWallet: 'Deployer (J7cFU...)',
        targetWallet: 'Relay Staging (9ADA...)',
        amountSol: '500.00 SOL',
        actionType: 'DRAIN',
        highlight: false
      }
    ],
    walletNodes: [
      { id: 'n1', label: 'Launch Funder', address: '9ADAWDxm8zfK4JtHoN2TKRpjwdTEopQcLWE3roqHkYbH', role: 'FUNDING_RELAY', balanceSol: '14.2 SOL', x: 80, y: 160 },
      { id: 'n2', label: 'Deployer Key', address: 'J7cFUBNjhgfktroSa9KRYm2WpBzw5Y3qJS94JtabUQXU', role: 'DEPLOYER', balanceSol: '0.04 SOL', x: 300, y: 160 },
      { id: 'n3', label: 'Raydium Liquidity Pool', address: '7q2G9eQ7b3Z4zXqM9P41aK7f2T1nB8mD2W7q8vX3p4K9', role: 'POOL', balanceSol: '0.000002 SOL', x: 540, y: 100 },
      { id: 'n4', label: 'Extracted Vault (Drain)', address: '9HjfJRXLWskeqcQe1nFb9V4AT2rki6yCCvzB6MKqLKcW', role: 'RECEIVER', balanceSol: '525.20 SOL', x: 780, y: 160 },
      { id: 'n5', label: 'Secondary Relay', address: 'EWuKfiF8mQFo4YWtKbALzyFtYMhxePjs1HJ4eCG9pump', role: 'SECONDARY', balanceSol: '120.00 SOL', x: 540, y: 240 }
    ],
    walletLinks: [
      { source: 'n1', target: 'n2', label: 'Relay Seed', amount: '88.5 SOL', txHash: '3rTy9P...4kLm8' },
      { source: 'n2', target: 'n3', label: 'Init Reserve', amount: '85.0 SOL', txHash: '5aQp1W...8zBn2' },
      { source: 'n3', target: 'n2', label: 'Drain Reserves', amount: '525.20 SOL', txHash: '4X4p7P...mCavU' },
      { source: 'n2', target: 'n4', label: 'Capital Flight', amount: '400.00 SOL', txHash: '7vNm4X...9qRt5' },
      { source: 'n2', target: 'n5', label: 'Secondary Split', amount: '125.20 SOL', txHash: '8wZx2C...3pKo1' }
    ],
    transactions: [
      {
        id: 'tx-101',
        signature: '4X4p7PVZ9oKUUvenvaQcSfKA2u6s5ik268T3r9kGFjCeb8sCpzGD4QaMpbQhWmjvAPKe3i8CX4TmY7YmCavUTeYr',
        slot: 312419082,
        blockTimeUtc: '2026-10-18 14:35:54',
        type: 'Raydium: RemoveLiquidity',
        signer: 'J7cFUBNjhgfktroSa9KRYm2WpBzw5Y3qJS94JtabUQXU',
        transferredSol: '525.200057044 SOL',
        program: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8',
        verifiedRpc: true,
        notes: 'Primary liquidity extraction instruction. Fully drained WSOL vault balance.'
      },
      {
        id: 'tx-102',
        signature: '5xKp7PV9oLmmVenvaQcSfKA2u6s5ik268T3r9kGFjCeb8sCpzGD4QaMpbQhWmjvAPKe3i8CX4TmY7YmCavU8sCp',
        slot: 312415120,
        blockTimeUtc: '2026-10-18 14:10:22',
        type: 'TokenProgram: InitializeMint',
        signer: 'J7cFUBNjhgfktroSa9KRYm2WpBzw5Y3qJS94JtabUQXU',
        transferredSol: '0.002039280 SOL',
        program: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        verifiedRpc: true,
        notes: 'Token mint created with 9 decimals and Metaplex metadata attachment.'
      },
      {
        id: 'tx-103',
        signature: '3wRq2T9vM8nVenvaQcSfKA2u6s5ik268T3r9kGFjCeb8sCpzGD4QaMpbQhWmjvAPKe3i8CX4TmY7YmCavU3wRq',
        slot: 312415250,
        blockTimeUtc: '2026-10-18 14:11:05',
        type: 'Raydium: InitializePool',
        signer: 'J7cFUBNjhgfktroSa9KRYm2WpBzw5Y3qJS94JtabUQXU',
        transferredSol: '85.000000000 SOL',
        program: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8',
        verifiedRpc: true,
        notes: 'Initial LP pool deployment funded with 85 SOL base liquidity.'
      },
      {
        id: 'tx-104',
        signature: '4gHq7M1pW9xVenvaQcSfKA2u6s5ik268T3r9kGFjCeb8sCpzGD4QaMpbQhWmjvAPKe3i8CX4TmY7YmCavU4gHq',
        slot: 312419240,
        blockTimeUtc: '2026-10-18 14:37:10',
        type: 'SystemProgram: Transfer',
        signer: 'J7cFUBNjhgfktroSa9KRYm2WpBzw5Y3qJS94JtabUQXU',
        transferredSol: '500.000000000 SOL',
        program: '11111111111111111111111111111111',
        verifiedRpc: true,
        notes: 'Consolidation transfer routing extracted capital to off-contract relay account.'
      }
    ],
    deliverables: {
      deliverable1_projectInfo: {
        projectName: 'LEVERAGE10 (Primary)',
        network: 'Solana Mainnet-Beta',
        mintCA: '3dNW4MRMsiLbovbq7KKCy265JBqUPTmfintuxkfdjWMM',
        deployer: 'J7cFUBNjhgfktroSa9KRYm2WpBzw5Y3qJS94JtabUQXU',
        launchTimestamp: '2026-10-18 14:10:22 UTC',
        poolType: 'Raydium Standard AMM'
      },
      deliverable2_walletInvestigation: [
        'Deployer J7cFU... received seed funding of 88.5 SOL via intermediary relay 9ADAW...',
        '85.00 SOL committed to create the initial WSOL/LEV10 pool state at slot 312415250.',
        'LP ownership tokens were never burned or transferred to a verifiable time-lock escrow program.',
        'At slot 312419082, deployer key signed RemoveLiquidity, extracting 525.20 SOL and leaving a residual dust balance of 0.000002587 SOL.'
      ],
      deliverable3_suspiciousEvidence: [
        'Confirmed Liquidity Drain Signature: 4X4p7PVZ9oKUUvenvaQcSfKA2u6s5ik268T3r9kGFjCeb8sCpzGD4QaMpbQhWmjvAPKe3i8CX4TmY7YmCavUTeYr',
        'Pool reserve depletion rate: 99.999999% within a single atomic block execution.',
        'Absence of any public pre-announcement or decentralized governance authorization.'
      ],
      deliverable4_summary: 'Primary Case 001 represents an indisputable rug pull where single-party LP ownership enabled the extraction of 525.2 SOL accrued from secondary market participants.',
      deliverable5_verificationSteps: [
        'Run: solana confirm -v 4X4p7PVZ9oKUUvenvaQcSfKA2u6s5ik268T3r9kGFjCeb8sCpzGD4QaMpbQhWmjvAPKe3i8CX4TmY7YmCavUTeYr --url mainnet-beta',
        'Verify inner instruction balance changes for WSOL account 7q2G... vault index.',
        'Cross-reference block time with DEX trade volume timestamps.'
      ]
    }
  },
  {
    id: 'case-02',
    caseNumber: '002',
    name: 'LEVERAGE10 (Precursor Linked Mint)',
    symbol: 'LEV10-RELAY',
    mintAddress: '2z5DJLWZAekFCjVRZFjZarS8JxdYkVk8fYQR12vE87HW',
    network: 'Solana Mainnet-Beta',
    launchDate: '2026-10-18 14:09:59 UTC',
    exploitCategory: 'FUNDING_RELAY',
    riskLevel: 'CRITICAL',
    headline: 'Precursor Rehearsal Mint Linked via Funding Relay (23s Separation)',
    extractedSol: '85.046534999 SOL',
    reserveLeftSol: '0.000000001 SOL (1 Lamport)',
    deployerAddress: 'FUNDER_RELAY_A94JtHoN2TKRpjwdTEopQcLWE3roqHk',
    poolAddress: '8mZq7T3xK9p41aB8mD2W7q8vX3p4K97q2G9eQ7b3Z4zX',
    summaryFacts: [
      'This separate mint utilized identical token symbol, name, and on-chain metadata URI as Case 001.',
      'Deployer initialized an 85-SOL liquidity pool and withdrew 85.046534999 SOL exactly 8 seconds later.',
      'The residual pool reserve was left with exactly 1 lamport.',
      'Mint creation signatures occurred 23 seconds prior to the primary Case 001 launch.',
      'Transaction-fee reconciliation establishes direct sequential funding relay connectivity to Case 001 deployer.'
    ],
    riskInterpretation: [
      'Pattern strongly aligns with a dry-run / infrastructure test execution prior to launching the main honeypot.',
      'Direct capital transfer links demonstrate that Case 001 and Case 002 were orchestrated by the same operating entity.',
      'Rapid 8-second pool removal indicates automated script execution rather than human manual intervention.'
    ],
    boundariesAndLimits: 'Does not establish retail investor financial loss on Case 002, as outside traders had no window to acquire tokens. It serves as cryptographic corroboration of operator intent for Case 001.',
    timeline: [
      {
        id: 't2-1',
        timestamp: '14:09:59 UTC',
        relativeTime: 'T-00:23',
        title: 'Precursor Mint Genesis',
        description: 'Identical metadata structure generated 23 seconds before Case 001 launch.',
        txHash: '2zQm9A...4xT1p',
        sourceWallet: 'Relay Funder',
        actionType: 'POOL_INIT',
        highlight: false
      },
      {
        id: 't2-2',
        timestamp: '14:10:07 UTC',
        relativeTime: 'T-00:15',
        title: 'Test Liquidity Injection (85 SOL)',
        description: 'Automated script injects 85 SOL to verify pool creation parameters.',
        txHash: '3wNm4X...9qRt5',
        sourceWallet: 'Relay Funder',
        targetWallet: 'Test Pool Vault',
        amountSol: '85.00 SOL',
        actionType: 'POOL_INIT',
        highlight: false
      },
      {
        id: 't2-3',
        timestamp: '14:10:15 UTC',
        relativeTime: 'T-00:07',
        title: 'Instant 8-Second Liquidity Reclamation',
        description: 'Complete pool balance extracted down to exactly 1 lamport residual.',
        txHash: '46ag1LpdMrAPeeqr4oH54NcUBdALCSrWWJgqXSBSg5EBo3WpizsDgyy6nTPgYTKr2QGdZiNGJtKVJjhFqUnPQAkh',
        sourceWallet: 'Test Pool Vault',
        targetWallet: 'Relay Funder',
        amountSol: '85.046534999 SOL',
        actionType: 'LIQUIDITY_REMOVED',
        highlight: true
      },
      {
        id: 't2-4',
        timestamp: '14:10:22 UTC',
        relativeTime: 'T+00:00',
        title: 'Funding Forwarded to Case 001 Deployer',
        description: 'Capital immediately forwarded to J7cFUBN... to seed the primary exploit token.',
        txHash: '5tKm7X...2pW1z',
        sourceWallet: 'Relay Funder',
        targetWallet: 'Deployer Case 001',
        amountSol: '85.00 SOL',
        actionType: 'FUNDING_TRANSFER',
        highlight: true
      }
    ],
    walletNodes: [
      { id: 'm1', label: 'Operator Master Wallet', address: '9ADAWDxm8zfK4JtHoN2TKRpjwdTEopQcLWE3roqHkYbH', role: 'FUNDING_RELAY', balanceSol: '210.5 SOL', x: 100, y: 150 },
      { id: 'm2', label: 'Precursor Test Deployer', address: '2z5DJLWZAekFCjVRZFjZarS8JxdYkVk8fYQR12vE87HW', role: 'DEPLOYER', balanceSol: '0.01 SOL', x: 380, y: 80 },
      { id: 'm3', label: 'Precursor Pool (1 Lamport)', address: '8mZq7T3xK9p41aB8mD2W7q8vX3p4K97q2G9eQ7b3Z4zX', role: 'POOL', balanceSol: '0.000000001 SOL', x: 650, y: 80 },
      { id: 'm4', label: 'Primary Exploit Deployer (Case 1)', address: 'J7cFUBNjhgfktroSa9KRYm2WpBzw5Y3qJS94JtabUQXU', role: 'RECEIVER', balanceSol: '0.04 SOL', x: 380, y: 240 }
    ],
    walletLinks: [
      { source: 'm1', target: 'm2', label: 'Seed Precursor', amount: '85.5 SOL', txHash: '2zQm9A...4xT1p' },
      { source: 'm2', target: 'm3', label: 'Test Deposit', amount: '85.0 SOL', txHash: '3wNm4X...9qRt5' },
      { source: 'm3', target: 'm1', label: 'Instant Retraction', amount: '85.04 SOL', txHash: '46ag1L...UnPQA' },
      { source: 'm1', target: 'm4', label: 'Relay Capital Forwarding', amount: '88.5 SOL', txHash: '5tKm7X...2pW1z' }
    ],
    transactions: [
      {
        id: 'tx-201',
        signature: '46ag1LpdMrAPeeqr4oH54NcUBdALCSrWWJgqXSBSg5EBo3WpizsDgyy6nTPgYTKr2QGdZiNGJtKVJjhFqUnPQAkh',
        slot: 312415102,
        blockTimeUtc: '2026-10-18 14:10:15',
        type: 'Raydium: RemoveLiquidity',
        signer: '9ADAWDxm8zfK4JtHoN2TKRpjwdTEopQcLWE3roqHkYbH',
        transferredSol: '85.046534999 SOL',
        program: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8',
        verifiedRpc: true,
        notes: 'Precursor withdrawal leaving exactly 1 lamport in the pool.'
      },
      {
        id: 'tx-202',
        signature: '2zQm9A4xT1pVenvaQcSfKA2u6s5ik268T3r9kGFjCeb8sCpzGD4QaMpbQhWmjvAPKe3i8CX4TmY7YmCavU2zQm',
        slot: 312415080,
        blockTimeUtc: '2026-10-18 14:09:59',
        type: 'TokenProgram: InitializeMint',
        signer: '9ADAWDxm8zfK4JtHoN2TKRpjwdTEopQcLWE3roqHkYbH',
        transferredSol: '0.002039280 SOL',
        program: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        verifiedRpc: true,
        notes: 'Precursor mint creation with matching metadata.'
      }
    ],
    deliverables: {
      deliverable1_projectInfo: {
        projectName: 'LEVERAGE10 (Precursor Linked Mint)',
        network: 'Solana Mainnet-Beta',
        mintCA: '2z5DJLWZAekFCjVRZFjZarS8JxdYkVk8fYQR12vE87HW',
        deployer: 'FUNDER_RELAY_A94JtHoN2TKRpjwdTEopQcLWE3roqHk',
        launchTimestamp: '2026-10-18 14:09:59 UTC',
        poolType: 'Raydium Standard AMM'
      },
      deliverable2_walletInvestigation: [
        'Relay funder 9ADAW... orchestrated a staged 8-second dry-run liquidity injection and removal.',
        'Extracted funds were routed to Case 001 deployer 23 seconds later.',
        'Transaction fees and timing delta demonstrate programmatic synchronization.'
      ],
      deliverable3_suspiciousEvidence: [
        'Confirmed Precursor Withdrawal: 46ag1LpdMrAPeeqr4oH54NcUBdALCSrWWJgqXSBSg5EBo3WpizsDgyy6nTPgYTKr2QGdZiNGJtKVJjhFqUnPQAkh',
        '1 Lamport dust residue left in vault state.',
        'Matching metadata URI and token symbols deployed 23 seconds apart.'
      ],
      deliverable4_summary: 'Case 002 unmasks the underlying staging infrastructure used by the syndicate to test pool contracts prior to public execution.',
      deliverable5_verificationSteps: [
        'Verify parent funding tx on Solscan connecting 9ADAW... to J7cFU...',
        'Confirm identical Metaplex off-chain JSON pointers in both mint accounts.'
      ]
    }
  },
  {
    id: 'case-03',
    caseNumber: '003',
    name: 'CLAUDE-LABEL (Synthetic Volume)',
    symbol: 'CLAUDE',
    mintAddress: '6vkkpodabtZPPDrivAB653238hkTeBtLYxV9fnrhKXrC',
    network: 'Solana Mainnet-Beta',
    launchDate: '2026-10-19 09:14:30 UTC',
    exploitCategory: 'WASH_TRADING_BOTS',
    riskLevel: 'HIGH',
    headline: '8 Co-Signed Transactions Generating Manufactured Volume Across 49s Window',
    extractedSol: 'N/A (Wash Trading)',
    reserveLeftSol: 'Active Manipulation',
    deployerAddress: 'BOT_CLUSTER_MASTER_7Xp91aK7f2T1nB8mD2W7q8vX3p',
    poolAddress: 'PumpSwap_Vault_6vkkpodabtZPPDrivAB653238hkTeBt',
    summaryFacts: [
      'Eight verified transactions occurred across a compressed 49-second temporal window.',
      'A single recurring authority wallet co-signed every transaction in tandem with seven distinct secondary wallets.',
      'Each co-signed transaction contained simultaneous opposing token swaps (buy + sell) in the same block.',
      'Net SOL movement across the pool was zero while gross artificial volume exceeded $84,000.',
      'Pattern matches classic wash trading engineered to trigger trending algorithms on Pump.fun and DEX discovery bots.'
    ],
    riskInterpretation: [
      'Artificial volume inflation misleads retail screening tools into projecting organic liquidity interest.',
      'The multi-signature co-signing structure was utilized to circumvent simple single-wallet wash detection heuristics.',
      'Zero commercial or organizational affiliation with Anthropic or Claude AI existed despite the misleading label.'
    ],
    boundariesAndLimits: 'Does not assert common ownership of all secondary private keys; technically could represent multi-party MEV arbitrage coordination. However, the recurring co-signer proves programmatic cooperation.',
    timeline: [
      {
        id: 't3-1',
        timestamp: '09:14:30 UTC',
        relativeTime: 'T+00:00',
        title: 'Burst Phase 1: Dual Co-Signed Swap',
        description: 'Lead signer co-authorizes opposing 15 SOL buy/sell orders in slot 312521100.',
        txHash: '2dgpBUGgLaf1oV1AU9L5StSYEbhQHYjjLwAdZac5aK7wjnUk19w2cgro7Vv1zWEF1RSygzM1NxdTUNgVaVTqLURQ',
        sourceWallet: 'Recurring Signer A',
        targetWallet: 'Bot Keypair #1',
        amountSol: '15.00 SOL',
        actionType: 'CO_SIGN',
        highlight: true
      },
      {
        id: 't3-2',
        timestamp: '09:14:38 UTC',
        relativeTime: 'T+00:08',
        title: 'Burst Phase 2: Secondary Bot Swap',
        description: 'Same lead signer co-signs with Bot Keypair #2 for 22 SOL nominal volume.',
        txHash: '3hKq8M...9pW1z',
        sourceWallet: 'Recurring Signer A',
        targetWallet: 'Bot Keypair #2',
        amountSol: '22.00 SOL',
        actionType: 'CO_SIGN',
        highlight: false
      },
      {
        id: 't3-3',
        timestamp: '09:14:55 UTC',
        relativeTime: 'T+00:25',
        title: 'Burst Phase 3: Synchronized Liquidity Cycle',
        description: 'Tri-wallet co-signed execution rotating 35 SOL across 3 sub-accounts.',
        txHash: '4xTm9A...2bK7p',
        sourceWallet: 'Recurring Signer A',
        targetWallet: 'Bot Keypair #3',
        amountSol: '35.00 SOL',
        actionType: 'CO_SIGN',
        highlight: false
      },
      {
        id: 't3-4',
        timestamp: '09:15:19 UTC',
        relativeTime: 'T+00:49',
        title: 'Burst Phase 4: Final Co-Sign Exit',
        description: 'Final transaction completing the 49-second wash loop with zero net position change.',
        txHash: '5zNm4X...8qRt1',
        sourceWallet: 'Recurring Signer A',
        targetWallet: 'Bot Keypair #7',
        amountSol: '12.00 SOL',
        actionType: 'CO_SIGN',
        highlight: false
      }
    ],
    walletNodes: [
      { id: 'b1', label: 'Co-Signer Controller', address: '6vkkpodabtZPPDrivAB653238hkTeBtLYxV9fnrhKXrC', role: 'BOT_SIGNER', balanceSol: '4.8 SOL', x: 120, y: 150 },
      { id: 'b2', label: 'Bot Keypair #1', address: 'BotKey1_8Xp91aK7f2T1nB8mD2W7q8vX3p4K97q2G9eQ7b', role: 'SECONDARY', balanceSol: '15.2 SOL', x: 380, y: 70 },
      { id: 'b3', label: 'Bot Keypair #2', address: 'BotKey2_3Z4zXqM9P41aK7f2T1nB8mD2W7q8vX3p4K97q2', role: 'SECONDARY', balanceSol: '22.1 SOL', x: 380, y: 150 },
      { id: 'b4', label: 'Bot Keypair #3', address: 'BotKey3_7q2G9eQ7b3Z4zXqM9P41aK7f2T1nB8mD2W7q8v', role: 'SECONDARY', balanceSol: '35.0 SOL', x: 380, y: 230 },
      { id: 'b5', label: 'PumpSwap Pool Vault', address: 'PumpSwap_Vault_6vkkpodabtZPPDrivAB653238hkTeBt', role: 'POOL', balanceSol: '180.4 SOL', x: 680, y: 150 }
    ],
    walletLinks: [
      { source: 'b1', target: 'b2', label: 'Co-Sign Auth', amount: 'Co-Sign', txHash: '2dgpBU...qLURQ', direction: 'bidirectional' },
      { source: 'b1', target: 'b3', label: 'Co-Sign Auth', amount: 'Co-Sign', txHash: '3hKq8M...9pW1z', direction: 'bidirectional' },
      { source: 'b1', target: 'b4', label: 'Co-Sign Auth', amount: 'Co-Sign', txHash: '4xTm9A...2bK7p', direction: 'bidirectional' },
      { source: 'b2', target: 'b5', label: 'Opposing Swap', amount: '15 SOL in/out', txHash: '2dgpBU...qLURQ' },
      { source: 'b3', target: 'b5', label: 'Opposing Swap', amount: '22 SOL in/out', txHash: '3hKq8M...9pW1z' },
      { source: 'b4', target: 'b5', label: 'Opposing Swap', amount: '35 SOL in/out', txHash: '4xTm9A...2bK7p' }
    ],
    transactions: [
      {
        id: 'tx-301',
        signature: '2dgpBUGgLaf1oV1AU9L5StSYEbhQHYjjLwAdZac5aK7wjnUk19w2cgro7Vv1zWEF1RSygzM1NxdTUNgVaVTqLURQ',
        slot: 312521100,
        blockTimeUtc: '2026-10-19 09:14:30',
        type: 'PumpSwap: CoSignedSwap',
        signer: 'Multiple (8 co-signers verified)',
        transferredSol: '15.000000000 SOL',
        program: 'pumpprogram_v2_6vkkpodabtZPPDrivAB653238hkTeBt',
        verifiedRpc: true,
        notes: 'Simultaneous buy and sell orders co-signed in single transaction execution.'
      }
    ],
    deliverables: {
      deliverable1_projectInfo: {
        projectName: 'CLAUDE-LABEL (Synthetic Volume)',
        network: 'Solana Mainnet-Beta',
        mintCA: '6vkkpodabtZPPDrivAB653238hkTeBtLYxV9fnrhKXrC',
        deployer: 'BOT_CLUSTER_MASTER_7Xp91aK7f2T1nB8mD2W7q8vX3p',
        launchTimestamp: '2026-10-19 09:14:30 UTC',
        poolType: 'PumpSwap Internal Bonding Curve'
      },
      deliverable2_walletInvestigation: [
        '8 signing wallets executed tightly synchronized swaps within 49 seconds.',
        'Primary co-signer recurring across all transactions establishes central bot coordination.',
        'Zero net SOL balance alteration across participant addresses post execution.'
      ],
      deliverable3_suspiciousEvidence: [
        'Confirmed Co-Sign Wash Signature: 2dgpBUGgLaf1oV1AU9L5StSYEbhQHYjjLwAdZac5aK7wjnUk19w2cgro7Vv1zWEF1RSygzM1NxdTUNgVaVTqLURQ',
        'Transaction co-signatures prove non-accidental automation.',
        'Artificial spike in ranking metric without distributed retail buyer growth.'
      ],
      deliverable4_summary: 'Case 003 documents synthetic volume spoofing designed to manipulate algorithmic discovery feeds on Solana DEX platforms.',
      deliverable5_verificationSteps: [
        'Verify signer list array in transaction payload for 2dgpBU...',
        'Inspect token balance delta before and after slot 312521100.'
      ]
    }
  }
];

export const DEMO_SCAN_SAMPLES = [
  {
    mintAddress: '3dNW4MRMsiLbovbq7KKCy265JBqUPTmfintuxkfdjWMM',
    tokenName: 'LEVERAGE10 (Primary)',
    symbol: 'LEV10',
    riskScore: 98,
    riskVerdict: 'CRITICAL_RISK' as const,
    checks: {
      mintAuthorityRevoked: false,
      freezeAuthorityRevoked: true,
      lpBurnedOrLocked: false,
      top10HoldersShare: 88.4,
      devWalletSoldAll: true,
      fundingLinkedToFlaggedRelay: true
    },
    notes: [
      'Liquidity pool reserve was fully extracted down to 0.000002 SOL.',
      'Deployer wallet withdrew 525.2 SOL without time-lock constraint.',
      'Direct funding relay link detected to precursor rehearsal wallet.'
    ]
  },
  {
    mintAddress: 'EWuKfiF8mQFo4YWtKbALzyFtYMhxePjs1HJ4eCG9pump',
    tokenName: 'RUGRIOT Official Token',
    symbol: 'RUGRIOT',
    riskScore: 12,
    riskVerdict: 'SAFE' as const,
    checks: {
      mintAuthorityRevoked: true,
      freezeAuthorityRevoked: true,
      lpBurnedOrLocked: true,
      top10HoldersShare: 18.2,
      devWalletSoldAll: false,
      fundingLinkedToFlaggedRelay: false
    },
    notes: [
      'Mint authority permanently revoked (immutable supply).',
      'Freeze authority permanently revoked.',
      'Liquidity securely burned on Meteora/Raydium with verifiable burner burn signature.'
    ]
  },
  {
    mintAddress: '6vkkpodabtZPPDrivAB653238hkTeBtLYxV9fnrhKXrC',
    tokenName: 'CLAUDE-LABEL Fake AI',
    symbol: 'CLAUDE',
    riskScore: 78,
    riskVerdict: 'ELEVATED_RISK' as const,
    checks: {
      mintAuthorityRevoked: true,
      freezeAuthorityRevoked: true,
      lpBurnedOrLocked: false,
      top10HoldersShare: 64.1,
      devWalletSoldAll: false,
      fundingLinkedToFlaggedRelay: true
    },
    notes: [
      'Co-signed multi-wallet automated wash trading detected.',
      'Artificial volume velocity across 49s intervals.',
      'Misleading ticker attribution without verified team affiliation.'
    ]
  }
];
