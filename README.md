# RUGRIOT INTEL // Solana On-Chain Forensic Dossier Console

> **Formal Research & Tooling Submission for the Pump.fun GO Bounty Challenge**  
> **Task ID:** `11e1d97d-f3b7-450d-b09b-368c9268d615`  
> **On-Chain Bounty Program ID:** `goGzNYTYkSEe4hUqz6dPmY5uf3CTt36AQAoujXDrKiV`  
> **On-Chain Bounty ID:** `1188632030353691843`

---

## Executive Overview

**RUGRIOT INTEL** is a dedicated on-chain forensic investigation console and interactive dossier viewer developed specifically for the **RUGRIOT Rug Hunters 1 SOL Bounty Challenge**. 

Instead of static, text-only reports, this platform delivers:
1. **Interactive Wallet Topology Graphs**: Visualizing capital flight routes, funding relays, and liquidity extractions.
2. **Chronological Exploit Scrubbers**: Step-by-step playback of deployer actions, block-by-block.
3. **RPC-Verified Signatures**: Live cryptographic verification of all transaction hashes against Solana Mainnet-Beta.
4. **RUGRIOT Scan Sandbox Engine**: A working prototype tool demonstrating automated risk checks (Mint/Freeze authority status, LP lock verification, Top 10 holder concentration).
5. **Format-Compliant Deliverables**: Reports structured strictly around Deliverables #1 through #5 as stipulated in the official bounty specification.

---

## Investigated Cases

### Case #001 — LEVERAGE10: Near-Total Liquidity Reserve Drain
- **Token CA:** `3dNW4MRMsiLbovbq7KKCy265JBqUPTmfintuxkfdjWMM`
- **Deployer Wallet:** `J7cFUBNjhgfktroSa9KRYm2WpBzw5Y3qJS94JtabUQXU`
- **Exploit Type:** Liquidity Extraction (Rug Pull)
- **Key Finding:** Creator initialized pool with 85.0 SOL and withdrew **525.200057044 SOL** 24 minutes and 49 seconds later, leaving a residual vault balance of **0.000002587 SOL**.
- **Primary Proof Signature:** `4X4p7PVZ9oKUUvenvaQcSfKA2u6s5ik268T3r9kGFjCeb8sCpzGD4QaMpbQhWmjvAPKe3i8CX4TmY7YmCavUTeYr`

### Case #002 — LEVERAGE10 (Precursor): Funding Relay Link
- **Token CA:** `2z5DJLWZAekFCjVRZFjZarS8JxdYkVk8fYQR12vE87HW`
- **Exploit Type:** Precursor Staging & Capital Relay
- **Key Finding:** Identical metadata and token ticker deployed 23 seconds prior to Case 001. Liquidity pool created with 85 SOL and extracted 8 seconds later (leaving 1 lamport). Capital forwarded to seed Case 001 deployer.
- **Primary Proof Signature:** `46ag1LpdMrAPeeqr4oH54NcUBdALCSrWWJgqXSBSg5EBo3WpizsDgyy6nTPgYTKr2QGdZiNGJtKVJjhFqUnPQAkh`

### Case #003 — CLAUDE-LABEL: Coordinated Multi-Wallet Wash Trading
- **Token CA:** `6vkkpodabtZPPDrivAB653238hkTeBtLYxV9fnrhKXrC`
- **Exploit Type:** Algorithmic Wash Trading & Fake Volume
- **Key Finding:** 8 distinct signing keypairs executed opposing buy/sell swaps within a compressed 49-second window. Central recurring co-signer verifies automated coordination.
- **Primary Proof Signature:** `2dgpBUGgLaf1oV1AU9L5StSYEbhQHYjjLwAdZac5aK7wjnUk19w2cgro7Vv1zWEF1RSygzM1NxdTUNgVaVTqLURQ`

---

## Safety & Ethics Compliance

- **Public Blockchain Data Only:** All findings are derived exclusively from public Solana RPC calls and explorer indices.
- **Zero Personal Identifiable Information (PII):** No real-world identities, off-chain accounts, or doxxing.
- **Evidence-Based:** Distinguishes between verifiable on-chain facts and risk patterns. No unsupported speculation.

---

## Getting Started

### Local Development
```bash
# Clone the repository
git clone https://github.com/nttinix/RUGRIOT.git
cd RUGRIOT

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
```

### Deployment on Vercel
Push this repository to GitHub and import it into Vercel. Zero configuration is required thanks to the included `vercel.json`.

---

## Tech Stack
- **Framework:** React 19 + TypeScript + Vite 8
- **Icons:** Lucide React (Industrial-grade iconography)
- **Styling:** Modular CSS Architecture (Zero AI gradient noise)
- **Deployment:** Vercel SPA Optimized
