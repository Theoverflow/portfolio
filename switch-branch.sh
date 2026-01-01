#!/bin/bash

# Branch switching helper script
# Usage: ./switch-branch.sh <branch-name>

set -e

BRANCH=$1

if [ -z "$BRANCH" ]; then
    echo "Usage: ./switch-branch.sh <branch-name>"
    echo "Available branches: main, site"
    exit 1
fi

# Check if branch exists
if ! git show-ref --verify --quiet refs/heads/$BRANCH && ! git show-ref --verify --quiet refs/remotes/origin/$BRANCH; then
    echo "Error: Branch '$BRANCH' does not exist"
    exit 1
fi

echo "🔄 Switching to branch: $BRANCH"

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes"
    read -p "Do you want to stash them? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git stash push -m "Stashed before switching to $BRANCH"
        echo "✅ Changes stashed"
    else
        echo "❌ Aborting. Please commit or stash your changes first."
        exit 1
    fi
fi

# Switch branch
git checkout $BRANCH

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "✅ Successfully switched to $BRANCH branch"
echo "🚀 Run 'npm run dev' to start development"

