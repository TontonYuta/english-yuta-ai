#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "🚀 Đang khởi động English Reading AI..."
"$SCRIPT_DIR/release/linux-unpacked/english-reading-ai" --no-sandbox "$@"
