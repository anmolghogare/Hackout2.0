#!/bin/bash
# HackOut'26 — Team ByteMe Industrial Carbon Intelligence One-Click Launcher

echo "🚀 Starting Team ByteMe — Industrial Carbon Intelligence Platform..."

# Find Node binary
NODE_BIN=$(which node 2>/dev/null || find /Users/anmolghogare/.cache -name node -type f 2>/dev/null | head -n 1)

if [ -z "$NODE_BIN" ]; then
  NODE_BIN="node"
fi

echo "Using Node binary: $NODE_BIN"

# Start Backend Server
$NODE_BIN server/server.js
