#!/bin/bash
# 防止sourceTree 找不到环境变量
if command -v node >/dev/null 2>&1; then
  echo 'exists node'
else
  source ~/.bash_profile
fi

node ./websrc/hooks/lint.js