import React, { useState } from 'react';
import type { WalletNode, WalletLink } from '../types';
import { ExternalLink, Copy, Check, GitCommit } from 'lucide-react';

interface WalletFlowGraphProps {
  nodes: WalletNode[];
  links: WalletLink[];
}

export const WalletFlowGraph: React.FC<WalletFlowGraphProps> = ({ nodes, links }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  const getRoleColor = (role: WalletNode['role']) => {
    switch (role) {
      case 'DEPLOYER':
        return { stroke: '#ef4444', bg: '#2b1418', text: '#fca5a5' };
      case 'FUNDING_RELAY':
        return { stroke: '#f59e0b', bg: '#2b2112', text: '#fde68a' };
      case 'POOL':
        return { stroke: '#38bdf8', bg: '#0e2433', text: '#bae6fd' };
      case 'RECEIVER':
        return { stroke: '#ec4899', bg: '#2e1222', text: '#fbcfe8' };
      case 'BOT_SIGNER':
        return { stroke: '#a855f7', bg: '#241433', text: '#e9d5ff' };
      default:
        return { stroke: '#94a3b8', bg: '#171c26', text: '#cbd5e1' };
    }
  };

  return (
    <div className="card p-5 bg-[#0f1118] border-[#222738]">
      <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-[#1b1f2e] gap-2">
        <div className="flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-[#f59e0b]" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-200">
            Interactive On-Chain Wallet Topology
          </h3>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-red-500 bg-red-950"></span>
            <span>Deployer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-amber-500 bg-amber-950"></span>
            <span>Funding Relay</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-blue-400 bg-blue-950"></span>
            <span>Pool Vault</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-pink-500 bg-pink-950"></span>
            <span>Extraction Sink</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full h-[360px] bg-[#090b10] rounded border border-[#1b1f2e] overflow-hidden">
        {/* Subtle Technical Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #4f5a7a 1px, transparent 1px), linear-gradient(to bottom, #4f5a7a 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <svg className="w-full h-full" viewBox="0 0 900 360" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706" />
            </marker>
          </defs>

          {/* Connection Links */}
          {links.map((link, idx) => {
            const src = nodes.find((n) => n.id === link.source);
            const tgt = nodes.find((n) => n.id === link.target);
            if (!src || !tgt) return null;

            const isRelated = selectedNodeId ? (link.source === selectedNodeId || link.target === selectedNodeId) : true;
            const midX = (src.x + tgt.x) / 2;
            const midY = (src.y + tgt.y) / 2;

            return (
              <g key={`link-${idx}`} opacity={isRelated ? 1 : 0.25} className="transition-opacity duration-200">
                {/* Background Line */}
                <line
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke="#283045"
                  strokeWidth="2"
                />
                {/* Animated Directional Flow Line */}
                <line
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  markerEnd="url(#arrow)"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="20;0"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </line>
                {/* Transfer Label */}
                <rect
                  x={midX - 35}
                  y={midY - 10}
                  width="70"
                  height="20"
                  rx="3"
                  fill="#121520"
                  stroke="#2c3348"
                  strokeWidth="1"
                />
                <text
                  x={midX}
                  y={midY + 4}
                  fill="#fde68a"
                  fontSize="10"
                  fontFamily="'JetBrains Mono', monospace"
                  textAnchor="middle"
                >
                  {link.amount}
                </text>
              </g>
            );
          })}

          {/* Interactive Nodes */}
          {nodes.map((node) => {
            const roleStyle = getRoleColor(node.role);
            const isSelected = selectedNode?.id === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setSelectedNodeId(node.id)}
                className="cursor-pointer group"
              >
                {/* Outer Ring */}
                <circle
                  r={isSelected ? "32" : "28"}
                  fill={roleStyle.bg}
                  stroke={isSelected ? '#f59e0b' : roleStyle.stroke}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  className="transition-all duration-150"
                />

                {/* Inner Center Dot */}
                <circle
                  r="6"
                  fill={roleStyle.stroke}
                />

                {/* Text Label Below */}
                <text
                  y="46"
                  textAnchor="middle"
                  fill={isSelected ? '#ffffff' : '#cbd5e1'}
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="'Inter', sans-serif"
                >
                  {node.label}
                </text>
                <text
                  y="59"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {node.address.slice(0, 4)}...{node.address.slice(-4)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Inspector Tray */}
      {selectedNode && (
        <div className="mt-3 p-3 rounded bg-[#121520] border border-[#212638] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
              style={{
                backgroundColor: getRoleColor(selectedNode.role).bg,
                color: getRoleColor(selectedNode.role).text,
                border: `1px solid ${getRoleColor(selectedNode.role).stroke}`
              }}
            >
              {selectedNode.role}
            </span>
            <span className="text-gray-100 font-semibold">{selectedNode.label}:</span>
            <span className="text-gray-300">{selectedNode.address}</span>
          </div>

          <div className="flex items-center gap-2">
            {selectedNode.balanceSol && (
              <span className="text-gray-400 mr-2">
                Balance: <strong className="text-amber-400">{selectedNode.balanceSol}</strong>
              </span>
            )}
            <button
              onClick={() => copyToClipboard(selectedNode.address)}
              className="btn btn-outline btn-sm py-1 px-2 text-[11px] flex items-center gap-1 border-[#2e354a] hover:border-gray-400"
            >
              {copied === selectedNode.address ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>Copy</span>
            </button>
            <a
              href={`https://solscan.io/account/${selectedNode.address}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-sm py-1 px-2 text-[11px] flex items-center gap-1 border-[#2e354a] hover:border-gray-400"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Solscan</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
