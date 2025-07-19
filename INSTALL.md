# Installation Guide

This guide will help you install the Share on Bluesky browser extension on your preferred browser.

## Prerequisites

Before installing the extension, you need to:

1. **Download the extension files** - Either clone this repository or download it as a ZIP file
2. **Generate the icons** (optional but recommended) - The extension includes placeholder icon files that should be replaced with actual PNG images

## Icon Setup (Recommended)

The extension includes an SVG butterfly icon that needs to be converted to PNG format:

1. Open `icons/icon.svg` in a web browser or image editor
2. Export/save it as PNG files in the following sizes:
   - `icon16.png` (16x16 pixels)
   - `icon32.png` (32x32 pixels) 
   - `icon48.png` (48x48 pixels)
   - `icon128.png` (128x128 pixels)
3. Replace the placeholder `.txt` files in the `icons/` directory with these PNG files

Alternatively, you can use online SVG to PNG converters or image editing software like GIMP, Photoshop, or Figma.

## Browser-Specific Installation

### Chrome / Chromium-based browsers (Edge, Brave, etc.)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top-right corner
3. Click "Load unpacked" button
4. Select the extension directory (the folder containing `manifest.json`)
5. The extension should now appear in your extensions list
6. Click the puzzle piece icon in the toolbar to pin the extension
7. The butterfly icon should now appear in your browser toolbar

### Firefox

1. Navigate to the `firefox/` folder in the extension directory
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on..."
5. Select the `manifest.json` file from the `firefox/` folder
6. The extension should now be loaded temporarily
7. The butterfly icon should appear in your toolbar

**Note:** Firefox temporary add-ons are removed when you restart the browser. For permanent installation, you'll need to package the extension or use Firefox's developer program.

**Important:** Firefox uses a separate folder with Manifest V2 format due to compatibility differences between Manifest V2 and V3.

### Safari

1. Open Safari and go to Safari > Preferences (or Safari > Settings on newer versions)
2. Click the "Advanced" tab
3. Check "Show Develop menu in menu bar"
4. Close Preferences
5. Go to Develop > Show Extension Builder
6. Click the "+" button and select "Add Extension"
7. Choose the extension directory
8. Click "Run" to install the extension
9. The extension should now appear in your toolbar

## Testing the Installation

1. Open the `test.html` file included in this repository in your browser
2. Click the butterfly icon in your toolbar
3. A new tab should open with Bluesky's compose interface
4. The post should be pre-filled with content from the test page

## Troubleshooting

### Extension not appearing
- Make sure you've enabled Developer mode (Chrome) or loaded it correctly (Firefox/Safari)
- For Firefox: Make sure you're loading the manifest.json from the `firefox/` folder
- Check that all files are in the correct directory structure
- Try refreshing the extensions page

### Icon not showing
- Ensure you've replaced the placeholder `.txt` files with actual PNG images
- Check that the PNG files are named correctly (`icon16.png`, `icon32.png`, etc.)
- Verify the file sizes match the expected dimensions

### Extension not working
- Make sure you're on a regular webpage (not a browser settings page)
- Check the browser's developer console for any error messages
- Verify that the extension has the necessary permissions

### Content not being extracted
- Some websites may not have proper meta tags
- Try the included `test.html` file to verify the extension is working
- Check that the website allows content scripts to run

## Uninstalling

### Chrome
1. Go to `chrome://extensions/`
2. Find "Share on Bluesky" in the list
3. Click "Remove"

### Firefox
1. Go to `about:debugging`
2. Click "This Firefox"
3. Find the extension and click "Remove"

### Safari
1. Go to Safari > Preferences > Extensions
2. Find "Share on Bluesky" and uncheck it or click "Remove"

## Support

If you encounter any issues during installation, please:
1. Check the troubleshooting section above
2. Verify you're using a supported browser version
3. Check the browser's developer console for error messages
4. Create an issue in the project repository with details about your setup 