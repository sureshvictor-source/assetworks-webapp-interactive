#!/bin/bash

echo "🔍 Finding files with Prisma imports..."

# Files that import from prisma
FILES_WITH_PRISMA=$(grep -r "from.*prisma" --include="*.ts" --include="*.tsx" --include="*.js" \
  --exclude-dir=node_modules --exclude-dir=.next /Users/Victor/Projects/AssetWorks/assetworks-webapp 2>/dev/null | \
  cut -d: -f1 | sort -u)

if [ -z "$FILES_WITH_PRISMA" ]; then
  echo "✅ No files with Prisma imports found!"
else
  echo "📋 Files that need updating:"
  for file in $FILES_WITH_PRISMA; do
    echo "  - $file"
  done
  echo ""
  echo "Total files: $(echo "$FILES_WITH_PRISMA" | wc -l | tr -d ' ')"
fi

echo ""
echo "🔍 Finding '@prisma' references..."
FILES_WITH_AT_PRISMA=$(grep -r "@prisma" --include="*.ts" --include="*.tsx" --include="*.js" \
  --exclude-dir=node_modules --exclude-dir=.next /Users/Victor/Projects/AssetWorks/assetworks-webapp 2>/dev/null | \
  cut -d: -f1 | sort -u)

if [ -z "$FILES_WITH_AT_PRISMA" ]; then
  echo "✅ No files with @prisma references found!"
else
  echo "📋 Files with @prisma references:"
  for file in $FILES_WITH_AT_PRISMA; do
    echo "  - $file"
  done
fi