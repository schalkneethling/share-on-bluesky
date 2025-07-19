# Share on Bluesky - Firefox Version

This folder contains the Firefox-specific version of the Share on Bluesky browser extension.

## Installation for Firefox

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on..."
4. Select the `manifest.json` file from this `firefox/` folder
5. The extension should now be loaded temporarily
6. The butterfly icon should appear in your toolbar

**Note:** Firefox temporary add-ons are removed when you restart the browser. For permanent installation, you'll need to package the extension or use Firefox's developer program.

## Differences from Chrome/Safari Version

- Uses Manifest V2 instead of V3
- Uses `browser_action` instead of `action`
- Uses `background.scripts` instead of `service_worker`
- References parent directory files with `../` paths

## Files

- `manifest.json` - Firefox-specific manifest file (Manifest V2)
- `background.js` - Firefox-specific background script
- `content.js` - Firefox-specific content script
- `README.md` - This file

The icons are shared from the parent directory (`../icons/`). 