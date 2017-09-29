#!/bin/bash

cp ./hooks/pre-commit-node.sh ../.git/hooks/pre-commit

chmod +x ../.git/hooks/pre-commit

echo "pre-commit 安装成功！"