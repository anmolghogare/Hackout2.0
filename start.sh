#!/bin/bash
# HackOut'26 — Team ByteMe Industrial Carbon Intelligence One-Click Launcher

echo "🚀 Starting Team ByteMe — Industrial Carbon Intelligence Platform..."

# Locate Node binary
if command -v node >/dev/null 2>&1; then
  NODE_BIN="node"
elif [ -f "/Users/anmolghogare/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node" ]; then
  NODE_BIN="/Users/anmolghogare/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
else
  NODE_BIN="node"
fi

echo "Using Node binary: $NODE_BIN"

# Start Backend Server
$NODE_BIN server/server.js
