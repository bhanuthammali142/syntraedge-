# SyntraEdge Global - Unified Website System

## Overview
This document describes the unified header, footer, and styling system implemented for consistent user experience across all pages.

## What's Been Implemented

### 1. Unified CSS System (`css/global.css`)
- **CSS Custom Properties**: Consistent color palette, typography, spacing, and design tokens
- **Component Styles**: Standardized navigation, buttons, cards, animations
- **Utility Classes**: Reusable classes for common styling needs
- **Responsive Design**: Mobile-first approach with consistent breakpoints

### 2. Unified Navigation System (`company/nav.html`)
- **Smart Navigation**: JavaScript-powered navigation that adapts to page context
- **Consistent Menu Structure**: All pages have the same navigation items and dropdowns
- **Active Page Highlighting**: Automatically highlights current page in navigation
- **Responsive Mobile Menu**: Consistent mobile experience across all pages

### 3. Unified Footer (`company/footer.html`)  
- **Consistent Contact Information**: Same company details across all pages
- **Working Navigation Links**: Footer links use same navigation system as header
- **Social Media Links**: Consistent social media presence
- **Legal Links**: Standardized privacy policy and terms links

### 4. Common JavaScript (`js/common.js`)
- **SyntraEdgeGlobal Object**: Central system for managing site functionality
- **Scroll Animations**: Consistent animation system across all pages
- **Counter Animations**: Animated statistics and achievements
- **Form Handling**: Standardized form submission and validation
- **Navigation Management**: Central navigation control system

## Pages Already Updated

✅ **index.html** - Home page with unified system
✅ **company/about.html** - About page with unified system
✅ **company/nav.html** - Unified navigation component  
✅ **company/footer.html** - Unified footer component

## How to Update Remaining Pages

### Step 1: Update CSS Imports
Replace the existing CSS section with:

```html
<!-- Core CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
<link href="https://use.typekit.net/wrt3xlf.css" rel="stylesheet">
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
</style>

<!-- Global Unified CSS -->
<link href="../css/global.css" rel="stylesheet">

<!-- Page Specific CSS -->
```

### Step 2: Replace Navigation
Replace existing navigation `<header>` or `<nav>` section with:

```html
<!-- Navigation - Load Unified Header -->
<div id="nav-placeholder">
    <!-- Navigation will be loaded here -->
</div>
```

### Step 3: Replace Footer  
Replace existing `<footer>` section with:

```html
<!-- Footer - Load Unified Footer -->
<div id="footer-placeholder">
    <!-- Footer will be loaded here -->
</div>
```

### Step 4: Update JavaScript
Replace existing JavaScript section (before `</body>`) with:

```html
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Load Unified Navigation & Footer Components -->
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Load navigation
        fetch('../company/nav.html')  // Adjust path based on page location
            .then(response => response.text())
            .then(data => {
                document.getElementById('nav-placeholder').innerHTML = data;
                // Initialize with page-specific config
                SyntraEdgeGlobal.init({
                    basePath: '../',  // Adjust based on page location
                    currentPage: 'services',  // Set appropriate page name
                    logoPath: '../images/Logo-C.png'  // Adjust path to logo
                });
            })
            .catch(error => console.error('Error loading navigation:', error));

        // Load footer
        fetch('../company/footer.html')  // Adjust path based on page location
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-placeholder').innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    });
</script>

<!-- Unified Common JavaScript -->
<script src="../js/common.js"></script>  <!-- Adjust path based on page location -->
```

### Step 5: Configuration by Page Location

#### For Pages in Root Directory (like index.html):
```javascript
SyntraEdgeGlobal.init({
    basePath: '',
    currentPage: 'home',  // or appropriate page name
    logoPath: 'images/Logo-C.png'
});
```

#### For Pages in Subdirectories (services/, industries/, careers/, company/):
```javascript
SyntraEdgeGlobal.init({
    basePath: '../',
    currentPage: 'services',  // or appropriate page name
    logoPath: '../images/Logo-C.png'
});
```

### Current Page Names for Navigation:
- `'home'` - Home page
- `'services'` - Any services page  
- `'testimonials'` - Testimonials/What We Think
- `'about'` - About Us page
- `'careers'` - Career pages
- `'contact'` - Contact page

## Color Palette

The unified system uses these CSS custom properties:

```css
:root {
    --primary: #341d55;      /* Deep purple - main brand */
    --secondary: #7470a6;    /* Light purple - secondary */
    --accent: #fbcd2e;       /* Golden yellow - accent */
    --dark: #111111;         /* Near black - text */
    --light: #ffffff;        /* Pure white */
}
```

## Benefits of This System

1. **Consistency**: All pages look and behave the same way
2. **Maintainability**: Changes to navigation/footer update all pages automatically
3. **Performance**: Shared CSS reduces load times
4. **Mobile-First**: Responsive design works consistently across devices
5. **SEO-Friendly**: Consistent structure and navigation helps search engines
6. **Accessibility**: Standardized focus states and aria labels
7. **Developer Experience**: Easy to update and maintain

## Files Modified

- `css/global.css` - New unified stylesheet  
- `js/common.js` - Updated with unified functionality
- `company/nav.html` - Unified navigation component
- `company/footer.html` - Unified footer component  
- `index.html` - Updated to use unified system
- `company/about.html` - Updated to use unified system

## Next Steps

1. Apply the update pattern to remaining pages:
   - All `/services/*.html` pages
   - All `/industries/*.html` pages  
   - All `/careers/*.html` pages
   - Any other HTML pages

2. Test navigation links and ensure all paths work correctly

3. Remove old CSS files that are no longer needed

4. Update any custom page-specific styling to use the new CSS variable system

## Testing Checklist

When updating each page:
- [ ] Navigation loads correctly
- [ ] Logo displays properly  
- [ ] Active page is highlighted in navigation
- [ ] All dropdown menus work
- [ ] Footer loads correctly
- [ ] All footer links work
- [ ] Page styling matches other pages
- [ ] Mobile navigation works
- [ ] Scroll animations work (if applicable)
- [ ] Forms work properly (if applicable)