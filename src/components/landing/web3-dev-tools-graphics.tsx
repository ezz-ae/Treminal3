
'use client';
import React from 'react';

export const DAppBuilderVector = () => (
    <svg width="100%" height="100%" viewBox="0 0 600 400" className="bg-card rounded-lg border overflow-hidden">
        <defs>
            <linearGradient id="dapp-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0 }} />
            </linearGradient>
        </defs>
        <rect x="1" y="1" width="598" height="398" rx="8" fill="hsl(var(--card))" />
        <rect x="1" y="1" width="598" height="40" fill="hsl(var(--secondary))" />
        <circle cx="20" cy="20" r="6" fill="hsl(var(--muted))" />
        <circle cx="40" cy="20" r="6" fill="hsl(var(--muted))" />
        <circle cx="60" cy="20" r="6" fill="hsl(var(--muted))" />
        <rect x="1" y="41" width="120" height="358" fill="hsl(var(--secondary))" />
        <rect x="15" y="60" width="90" height="20" rx="4" fill="hsl(var(--muted))" />
        <rect x="15" y="90" width="90" height="8" rx="2" fill="hsl(var(--muted))" />
        <rect x="15" y="105" width="70" height="8" rx="2" fill="hsl(var(--muted))" />
        <rect x="15" y="140" width="90" height="20" rx="4" fill="hsl(var(--primary))" opacity="0.5" />
        <rect x="15" y="170" width="90" height="8" rx="2" fill="hsl(var(--muted))" />
        <rect x="15" y="185" width="70" height="8" rx="2" fill="hsl(var(--muted))" />
        <rect x="15" y="220" width="90" height="20" rx="4" fill="hsl(var(--muted))" />
        <rect x="15" y="250" width="90" height="8" rx="2" fill="hsl(var(--muted))" />
        <rect x="15" y="265" width="70" height="8" rx="2" fill="hsl(var(--muted))" />
        <g>
            <rect x="150" y="70" width="220" height="120" rx="8" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1"/>
            <rect x="165" y="85" width="50" height="50" rx="4" fill="hsl(var(--primary))" />
            <rect x="230" y="85" width="125" height="12" rx="2" fill="hsl(var(--muted))" />
            <rect x="230" y="105" width="95" height="8" rx="2" fill="hsl(var(--muted))" />
            <rect x="230" y="121" width="95" height="8" rx="2" fill="hsl(var(--muted))" />
            <rect x="400" y="70" width="160" height="280" rx="8" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1"/>
            <rect x="415" y="85" width="130" height="12" rx="2" fill="hsl(var(--muted))" />
            <rect x="415" y="105" width="95" height="8" rx="2" fill="hsl(var(--muted))" />
            <circle cx="430" cy="140" r="15" fill="hsl(var(--primary))" />
            <rect x="455" y="132" width="70" height="16" rx="3" fill="hsl(var(--muted))" />
            <rect x="150" y="220" width="220" height="130" rx="8" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1"/>
            <rect x="165" y="235" width="190" height="12" rx="2" fill="hsl(var(--muted))" />
            <rect x="165" y="255" width="150" height="8" rx="2" fill="hsl(var(--muted))" />
            <rect x="165" y="275" width="190" height="25" rx="4" fill="hsl(var(--primary))" />
            <path d="M 370 130 C 400 130, 400 190, 400 190" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeDasharray="4" />
            <path d="M 260 190 L 260 220" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeDasharray="4" />
        </g>
    </svg>
);

export const TokenLauncherVector = () => (
    <svg width="100%" height="100%" viewBox="0 0 600 400" className="bg-card rounded-lg border overflow-hidden">
        <rect x="1" y="1" width="598" height="398" rx="8" fill="hsl(var(--card))" />
        <rect x="1" y="1" width="598" height="40" fill="hsl(var(--secondary))" />
        <circle cx="20" cy="20" r="6" fill="hsl(var(--muted))" />
        <circle cx="40" cy="20" r="6" fill="hsl(var(--muted))" />
        <circle cx="60" cy="20" r="6" fill="hsl(var(--muted))" />
        <g fontFamily="monospace" fontSize="14" fill="hsl(var(--foreground))">
            <text x="20" y="80"><tspan fill="hsl(var(--primary))">pragma</tspan> solidity ^0.8.20;</text>
            <text x="20" y="110"><tspan fill="hsl(var(--primary))">import</tspan> "@openzeppelin/contracts/token/ERC20/ERC20.sol";</text>
            <text x="20" y="140"><tspan fill="hsl(var(--primary))">contract</tspan> MyToken <tspan fill="hsl(var(--primary))">is</tspan> ERC20 {'{'}</text>
            <text x="40" y="170"><tspan fill="hsl(var(--primary))">constructor</tspan>() ERC20("My Token", "MTK") {'{'}</text>
            <text x="60" y="200">_mint(msg.sender, 1000000 * 10**18);</text>
            <text x="40" y="230">{'}'}</text>
            <text x="20" y="260">{'}'}</text>
        </g>
    </svg>
);

export const TradingBotVector = () => (
    <svg width="100%" height="100%" viewBox="0 0 600 400" className="bg-card rounded-lg border overflow-hidden">
        <rect x="1" y="1" width="598" height="398" rx="8" fill="hsl(var(--card))" />
        <path d="M50 300 L150 200 L250 250 L350 150 L450 180 L550 80" stroke="hsl(var(--primary))" strokeWidth="4" fill="none" />
        <path d="M50 320 L150 220 L250 270 L350 170 L450 200 L550 100" stroke="hsl(var(--secondary))" strokeWidth="4" fill="none" />
        <circle cx="150" cy="200" r="8" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="2" />
        <circle cx="350" cy="150" r="8" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="2" />
        <circle cx="550" cy="80" r="8" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="2" />
    </svg>
);

export const AIVector = () => (
    <svg width="100%" height="100%" viewBox="0 0 600 400" className="bg-card rounded-lg border overflow-hidden">
        <rect x="1" y="1" width="598" height="398" rx="8" fill="hsl(var(--card))" />
        <defs>
            <radialGradient id="ai-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
        </defs>
        <circle cx="300" cy="200" r="150" fill="url(#ai-grad)" />
        <circle cx="300" cy="200" r="20" fill="hsl(var(--primary))" />
        {[...Array(6)].map((_, i) => (
            <circle key={i} cx={300 + 100 * Math.cos(i * Math.PI / 3)} cy={200 + 100 * Math.sin(i * Math.PI / 3)} r="10" fill="hsl(var(--secondary))" />
        ))}
    </svg>
);

export const DefaultVector = () => (
    <svg width="100%" height="100%" viewBox="0 0 600 400" className="bg-card rounded-lg border overflow-hidden">
        <rect x="1" y="1" width="598" height="398" rx="8" fill="hsl(var(--card))" />
    </svg>
);
