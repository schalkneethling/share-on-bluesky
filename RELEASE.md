# Release Guide

This guide provides a complete overview of how to release the Share on Bluesky extension.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Package for all browsers:**
   ```bash
   npm run package-all
   ```

3. **Upload to stores:**
   - Chrome: Upload `dist/share-on-bluesky-chrome.zip` to [Chrome Web Store](https://chrome.google.com/webstore/devconsole/)
   - Firefox: Upload `dist/share-on-bluesky-firefox.zip` to [Firefox Add-ons](https://addons.mozilla.org/developers/)

## What Gets Packaged

### Chrome/Safari Version (`dist/share-on-bluesky-chrome.zip`)
- `manifest.json` - Manifest V3 with service worker
- `background.js` - Service worker for Chrome/Safari
- `content.js` - Cross-browser content script
- `icons/` - All icon sizes
- Documentation files

### Firefox Version (`dist/share-on-bluesky-firefox.zip`)
- `manifest.json` - Manifest V2 with background scripts
- `background.js` - Traditional background script for Firefox
- `content.js` - Firefox-specific content script
- `icons/` - All icon sizes
- Documentation files

## Store Requirements

### Chrome Web Store
- **Developer Account:** $5 one-time fee
- **Icon:** 128x128 PNG
- **Screenshots:** 1280x800 or 640x400
- **Description:** Clear, compelling description
- **Privacy Policy:** Required (extension doesn't collect data)
- **Category:** Productivity or Social

### Firefox Add-ons
- **Developer Account:** Free
- **Icon:** 128x128 PNG
- **Screenshots:** 1268x680
- **Description:** Clear, compelling description
- **Privacy Policy:** Required (extension doesn't collect data)
- **Category:** Social & Communication

## Store Listing Content

### Extension Description
```
Share on Bluesky - One-click sharing to Bluesky

Share any webpage to Bluesky with a single click! This extension automatically extracts the page title, description, and URL, then opens Bluesky's compose interface with the content pre-filled.

Features:
• One-click sharing to Bluesky
• Smart content extraction (prioritizes Open Graph meta tags)
• Automatic UTM parameter removal
• Respects Bluesky's 300 character limit
• Removes GitHub boilerplate text
• Duplicate text detection and removal
• Works on Chrome, Firefox, and Safari

Perfect for developers, content creators, and anyone who wants to share interesting web content on Bluesky quickly and efficiently.
```

### Privacy Policy
```
Privacy Policy for Share on Bluesky Extension

This extension does not collect, store, or transmit any personal data.

What we do:
• Extract page title, description, and URL from the current webpage
• Remove UTM parameters and GitHub boilerplate text
• Format content for Bluesky's compose interface
• Open Bluesky's compose URL in a new tab

What we don't do:
• Store any data locally or remotely
• Track user behavior
• Collect personal information
• Share data with third parties

The extension only processes the current webpage's content when you click the extension icon and does not maintain any persistent data.
```

## Testing Before Release

1. **Test packaged extensions:**
   ```bash
   # Extract and test Chrome version
   unzip dist/share-on-bluesky-chrome.zip -d test-chrome/
   # Load in Chrome for testing
   
   # Extract and test Firefox version
   unzip dist/share-on-bluesky-firefox.zip -d test-firefox/
   # Load in Firefox for testing
   ```

2. **Test on various websites:**
   - GitHub repositories
   - News articles
   - Blog posts
   - Social media posts
   - Pages with/without Open Graph tags

3. **Verify features:**
   - Content extraction works correctly
   - Character limit handling
   - GitHub content cleaning
   - Duplicate text removal
   - UTM parameter removal

## Version Management

### Updating Version Numbers
1. Update `package.json`:
   ```json
   {
     "version": "1.0.1"
   }
   ```

2. Update both manifest files:
   ```json
   {
     "version": "1.0.1"
   }
   ```

3. Create new packages:
   ```bash
   npm run package-all
   ```

### Changelog Template
```markdown
# Changelog

## [1.0.1] - 2024-01-15
### Added
- New feature description

### Fixed
- Bug fix description

### Changed
- Change description

## [1.0.0] - 2024-01-01
### Added
- Initial release
- One-click sharing to Bluesky
- Smart content extraction
- GitHub content cleaning
- Duplicate text removal
- UTM parameter removal
- Cross-browser compatibility
```

## Distribution Options

### 1. Browser Stores (Recommended)
- **Pros:** Automatic updates, user trust, easy discovery
- **Cons:** Review process, fees (Chrome only)

### 2. GitHub Releases
- **Pros:** Free, no review, full control
- **Cons:** Manual updates, users must trust source

### 3. Direct Website Distribution
- **Pros:** Full control, no fees
- **Cons:** Manual updates, users must trust source

## Post-Release

1. **Monitor reviews and feedback**
2. **Respond to user issues**
3. **Plan future updates**
4. **Maintain extension compatibility**

## Troubleshooting

### Common Issues
- **"Invalid manifest"** - Check manifest version compatibility
- **"Extension not loading"** - Check for JavaScript errors
- **"Permission denied"** - Verify permissions are correct

### Getting Help
- Browser developer documentation
- Extension store guidelines
- Browser developer tools
- Extension debugging features

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser developer documentation
3. Test with browser developer tools
4. Create an issue in the project repository 