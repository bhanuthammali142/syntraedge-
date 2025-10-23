#!/bin/bash

# Simple script to update one specific page
update_single_page() {
    local file_path="$1"
    local base_path="$2"
    local current_page="$3"
    
    echo "Updating: $file_path"
    
    # Backup original
    cp "$file_path" "$file_path.backup"
    
    # Use sed to update the file with unified navigation and footer
    
    # 1. Update CSS link to use global.css
    sed -i 's|<!-- Custom CSS.*|<!-- Global Unified CSS -->\n    <link href="'"$base_path"'css/global.css" rel="stylesheet">\n    \n    <!-- Page Specific CSS -->|g' "$file_path"
    
    # 2. Replace navigation section (simpler approach)
    # Find the start of navigation and replace with placeholder
    if grep -q "<!-- Navigation -->" "$file_path"; then
        # Create a temporary file with the replacement content
        awk '
        /<!-- Navigation -->/ {
            print "    <!-- Navigation - Load Unified Header -->"
            print "    <div id=\"nav-placeholder\">"
            print "        <!-- Navigation will be loaded here -->"
            print "    </div>"
            # Skip until end of header
            while (getline && !/^    <\/header>/) continue
            next
        }
        /<!-- Footer -->/ {
            print "    <!-- Footer - Load Unified Footer -->"
            print "    <div id=\"footer-placeholder\">"
            print "        <!-- Footer will be loaded here -->"
            print "    </div>"
            # Skip until end of footer
            while (getline && !/^    <\/footer>/) continue
            next
        }
        { print }
        ' "$file_path" > "$file_path.tmp" && mv "$file_path.tmp" "$file_path"
    fi
    
    echo "Updated: $file_path"
}

# Usage example:
# update_single_page "/path/to/file.html" "../" "services"

echo "Page update function ready. Use: update_single_page <file_path> <base_path> <page_type>"