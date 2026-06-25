#!/bin/zsh

# Path to your output_aab directory
OUTPUT_AAB_DIR="/Users/jayanthbharadwajm/development/stothram/android/app/build/outputs/bundle/release/output_aab"

# Check if greadelf exists
if ! command -v greadelf &> /dev/null; then
    echo "greadelf not found! Install binutils via Homebrew first."
    exit 1
fi

echo "Checking all .so files in $OUTPUT_AAB_DIR for 16 KB page support..."
echo "------------------------------------------------------------"

# Loop through all .so files
find "$OUTPUT_AAB_DIR" -name "*.so" | while read lib; do
    # Check page size attributes
    PAGE=$(greadelf -A "$lib" 2>/dev/null | grep -i "Tag_ABI_PageSize")
    if [[ -z "$PAGE" ]]; then
        echo "❌ $lib → Missing 16 KB page size support"
    else
        echo "✅ $lib → $PAGE"
    fi
done

echo "------------------------------------------------------------"
echo "Check complete."
