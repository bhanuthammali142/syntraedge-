#!/bin/bash

# Script to update all HTML pages with unified header/footer system
# This script will update the CSS links and JavaScript includes

echo "Starting website standardization process..."

# Create a function to update a single HTML file
update_html_page() {
    local file_path="$1"
    local base_path="$2"
    local current_page="$3"
    local logo_path="$4"
    
    echo "Updating: $file_path"
    
    # Create backup
    cp "$file_path" "$file_path.backup"
    
    # Update CSS imports (remove inline styles, add global.css)
    sed -i 's|<!-- Custom CSS -->|<!-- Global Unified CSS -->\n    <link href="'"$base_path"'css/global.css" rel="stylesheet">\n    \n    <!-- Page Specific CSS -->|g' "$file_path"
    
    # Add navigation placeholder if header exists
    if grep -q "<!-- Navigation -->" "$file_path" || grep -q "<header" "$file_path" || grep -q "<nav" "$file_path"; then
        # Replace existing navigation with placeholder
        sed -i '/<!-- Navigation -->/,/<\/header>/c\
    <!-- Navigation - Load Unified Header -->\
    <div id="nav-placeholder">\
        <!-- Navigation will be loaded here -->\
    </div>' "$file_path"
    fi
    
    # Add footer placeholder if footer exists  
    if grep -q "<!-- Footer -->" "$file_path" || grep -q "<footer" "$file_path"; then
        # Replace existing footer with placeholder
        sed -i '/<!-- Footer -->/,/<\/footer>/c\
    <!-- Footer - Load Unified Footer -->\
    <div id="footer-placeholder">\
        <!-- Footer will be loaded here -->\
    </div>' "$file_path"
    fi
    
    # Add unified JavaScript before </body>
    if ! grep -q "SyntraEdgeGlobal.init" "$file_path"; then
        sed -i 's|</body>|    <!-- Load Unified Navigation \& Footer Components -->\
    <script>\
        document.addEventListener('\''DOMContentLoaded'\'', function() {\
            // Load navigation\
            fetch('\'''"$base_path"'company/nav.html'\'')\
                .then(response => response.text())\
                .then(data => {\
                    document.getElementById('\''nav-placeholder'\'').innerHTML = data;\
                    // Initialize with page config\
                    SyntraEdgeGlobal.init({\
                        basePath: '\'''"$base_path"''\'',\
                        currentPage: '\'''"$current_page"''\'',\
                        logoPath: '\'''"$logo_path"''\''\
                    });\
                })\
                .catch(error => console.error('\''Error loading navigation:'\'', error));\
\
            // Load footer\
            fetch('\'''"$base_path"'company/footer.html'\'')\
                .then(response => response.text())\
                .then(data => {\
                    document.getElementById('\''footer-placeholder'\'').innerHTML = data;\
                })\
                .catch(error => console.error('\''Error loading footer:'\'', error));\
        });\
    </script>\
    \
    <!-- Unified Common JavaScript -->\
    <script src="'"$base_path"'js/common.js"></script>\
\
</body>|g' "$file_path"
    fi
}

# Update index.html (root level)
# Already updated manually

# Update company pages
update_html_page "/workspaces/syntraedge-/synraedgeglobal/company/testimonials.html" "../" "testimonials" "../images/Logo-C.png"

# Update services pages  
for service_file in /workspaces/syntraedge-/synraedgeglobal/services/*.html; do
    if [ -f "$service_file" ]; then
        filename=$(basename "$service_file" .html)
        update_html_page "$service_file" "../" "services" "../images/Logo-C.png"
    fi
done

# Update industries pages
for industry_file in /workspaces/syntraedge-/synraedgeglobal/industries/*.html; do
    if [ -f "$industry_file" ]; then
        filename=$(basename "$industry_file" .html)
        update_html_page "$industry_file" "../" "services" "../images/Logo-C.png"
    fi
done

# Update careers pages
for career_file in /workspaces/syntraedge-/synraedgeglobal/careers/*.html; do
    if [ -f "$career_file" ]; then
        filename=$(basename "$career_file" .html)
        if [[ "$career_file" == *"contact"* ]]; then
            update_html_page "$career_file" "../" "contact" "../images/Logo-C.png"
        else
            update_html_page "$career_file" "../" "careers" "../images/Logo-C.png"
        fi
    fi
done

echo "Website standardization complete!"
echo "All pages now use unified header/footer system and global CSS."