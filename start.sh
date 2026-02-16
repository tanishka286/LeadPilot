#!/bin/bash

# LeadPilot Quick Start Script
# This script sets up the Next.js project and starts development

echo "🚀 LeadPilot Landing Page - Quick Start"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Start development server
echo "🔥 Starting development server..."
echo "👉 Open http://localhost:3000 in your browser"
echo ""

npm run dev
