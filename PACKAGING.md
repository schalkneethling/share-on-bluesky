# Packaging Guide

This guide explains how to package the Share on Bluesky extension for different browsers.

## Prerequisites

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate icons** (if not already done):
   ```bash
   npm run build-icons
   ```

## Quick Packaging

### Package All Browsers
```bash
npm run package-all
```

This will create:
- `dist/share-on-bluesky-chrome.zip` - Chrome/Safari version
- `dist/share-on-bluesky-firefox.zip` - Firefox version

### Package Individual Browsers
```bash
# Chrome/Safari only
npm run package-chrome

# Firefox only
npm run package-firefox
```

## Manual Packaging

### Chrome/Safari Extension

1. **Create a ZIP file** containing:
   ```
   share-on-bluesky/
   ├── manifest.json
   ├── background.js
   ├── content.js
   ├── icons/
   │   ├── icon16.png
   │   ├── icon32.png
   │   ├── icon48.png
   │   └── icon128.png
   ├── README.md
   └── LICENSE
   ```

2. **Upload to Chrome Web Store:**
   - Go to [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
   - Click "Add new item"
   - Upload the ZIP file
   - Fill in store listing details
   - Pay the one-time developer registration fee ($5)

### Firefox Extension

1. **Create a ZIP file** containing:
   ```
   share-on-bluesky/
   ├── manifest.json (from firefox/ folder)
   ├── background.js (from firefox/ folder)
   ├── content.js (from firefox/ folder)
   ├── icons/
   │   ├── icon16.png
   │   ├── icon32.png
   │   ├── icon48.png
   │   └── icon128.png
   └── README.md
   ```

2. **Upload to Firefox Add-ons:**
   - Go to [Firefox Add-ons Developer Hub](https://addons.mozilla.org/developers/)
   - Click "Submit a New Add-on"
   - Upload the ZIP file
   - Fill in store listing details
   - No registration fee required

### Safari Extension

Safari extensions are distributed through the Mac App Store:

1. **Package as a Safari App Extension:**
   - Create an Xcode project
   - Add the extension as a target
   - Bundle with a macOS app
   - Submit to Mac App Store

2. **Alternative: Manual Installation**
   - Users can install directly from the ZIP file
   - Enable Developer mode in Safari
   - Load unpacked extension

## Distribution Options

### 1. Browser Stores (Recommended)

**Chrome Web Store:**
- ✅ Automatic updates
- ✅ User trust
- ✅ Easy discovery
- ❌ $5 registration fee
- ❌ Review process

**Firefox Add-ons:**
- ✅ Automatic updates
- ✅ User trust
- ✅ Easy discovery
- ✅ Free
- ❌ Review process

### 2. Direct Distribution

**GitHub Releases:**
- ✅ Free
- ✅ No review process
- ✅ Full control
- ❌ Manual updates
- ❌ Users must trust source

**Your Website:**
- ✅ Full control
- ✅ No fees
- ❌ Manual updates
- ❌ Users must trust source

## Store Listing Requirements

### Chrome Web Store
- **Icon:** 128x128 PNG
- **Screenshots:** 1280x800 or 640x400
- **Description:** Clear, compelling description
- **Privacy Policy:** Required if collecting data
- **Category:** Productivity or Social

### Firefox Add-ons
- **Icon:** 128x128 PNG
- **Screenshots:** 1268x680
- **Description:** Clear, compelling description
- **Privacy Policy:** Required if collecting data
- **Category:** Social & Communication

## Testing Before Release

1. **Test the packaged extension:**
   ```bash
   # Extract the ZIP file
   unzip dist/share-on-bluesky-chrome.zip -d test-chrome/
   unzip dist/share-on-bluesky-firefox.zip -d test-firefox/
   
   # Load in browser for testing
   ```

2. **Verify functionality:**
   - Test on different websites
   - Check character limit handling
   - Verify GitHub content cleaning
   - Test duplicate removal

3. **Cross-browser testing:**
   - Chrome/Chromium
   - Firefox
   - Safari (if applicable)

## Version Management

### Updating the Extension

1. **Update version in manifests:**
   ```json
   {
     "version": "1.0.1"
   }
   ```

2. **Update version in package.json:**
   ```json
   {
     "version": "1.0.1"
   }
   ```

3. **Create new packages:**
   ```bash
   npm run package-all
   ```

4. **Upload to stores:**
   - Chrome: Upload new ZIP file
   - Firefox: Upload new ZIP file

### Changelog

Keep a `CHANGELOG.md` file:
```markdown
# Changelog

## [1.0.1] - 2024-01-15
### Added
- New feature X

### Fixed
- Bug Y

## [1.0.0] - 2024-01-01
### Added
- Initial release
```

## Troubleshooting

### Common Issues

**"Invalid manifest" error:**
- Check manifest version compatibility
- Verify all required fields are present
- Ensure file paths are correct

**"Extension not loading" error:**
- Check for JavaScript errors in console
- Verify all referenced files exist
- Test with minimal manifest first

**"Permission denied" error:**
- Ensure all permissions are properly declared
- Check for typos in permission names

### Getting Help

- Check browser developer documentation
- Review extension store guidelines
- Test with browser developer tools
- Use browser extension debugging features 