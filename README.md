# Share on Bluesky

A browser extension that allows you to share the current webpage on Bluesky with a single click. The extension extracts the page title, description, and URL, then opens Bluesky's compose interface with the content pre-filled.

## Features

- 🦋 One-click sharing to Bluesky
- 📝 Automatically extracts page title and description
- 🔗 Removes UTM parameters from URLs
- 📏 Respects Bluesky's 300 character limit
- 🌐 Works on Chrome, Firefox, and Safari
- 🎯 Prioritizes Open Graph meta tags for better content extraction

## Installation

### Chrome/Edge
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. The extension icon (butterfly) will appear in your toolbar

### Firefox
1. Download or clone this repository
2. Navigate to the `firefox/` folder in the repository
3. Open Firefox and navigate to `about:debugging`
4. Click "This Firefox" in the sidebar
5. Click "Load Temporary Add-on" and select the `manifest.json` file from the `firefox/` folder
6. The extension icon will appear in your toolbar

**Note:** Firefox uses a separate folder with Manifest V2 format due to compatibility differences between Manifest V2 and V3.

### Safari
1. Download or clone this repository
2. Open Safari and go to Safari > Preferences > Advanced
3. Enable "Show Develop menu in menu bar"
4. Go to Develop > Show Extension Builder
5. Click the + button and select "Add Extension"
6. Choose the extension directory
7. Click "Run" to install the extension

## Usage

1. Navigate to any webpage you want to share
2. Click the butterfly icon in your browser toolbar
3. A new tab will open with Bluesky's compose interface
4. The post will be pre-filled with: `Title | Description | URL`
5. Review and post to Bluesky

## How it Works

The extension:
1. Extracts the page title (prioritizes `og:title`, falls back to `<title>`)
2. Gets the page description (prioritizes `og:description`, falls back to meta description)
3. Captures the current URL and removes UTM parameters
4. Calculates available space within Bluesky's 300 character limit
5. Formats the content as: `Title | Description | URL`
6. Opens Bluesky's compose URL with the pre-filled content

## Character Limit Handling

The extension intelligently handles Bluesky's 300 Unicode Grapheme Clusters limit:
- Always includes the title and URL
- Fills remaining space with description
- Truncates description with "..." if needed
- Removes UTM parameters to save space

## Development

### Project Structure
```
share-on-bluesky/
├── manifest.json          # Extension manifest (Chrome/Safari - Manifest V3)
├── background.js          # Background script (handles icon clicks)
├── content.js            # Content script (extracts page data)
├── icons/                # Extension icons
│   ├── icon.svg          # Source SVG icon
│   ├── icon16.png        # 16x16 icon
│   ├── icon32.png        # 32x32 icon
│   ├── icon48.png        # 48x48 icon
│   └── icon128.png       # 128x128 icon
├── firefox/              # Firefox-specific files
│   ├── manifest.json     # Firefox manifest (Manifest V2)
│   └── README.md         # Firefox installation guide
├── scripts/              # Build scripts
│   ├── generate-icons.js # Icon generation script
│   ├── package-chrome.js # Chrome packaging script
│   └── package-firefox.js # Firefox packaging script
├── dist/                 # Distribution files (generated)
│   ├── share-on-bluesky-chrome.zip
│   └── share-on-bluesky-firefox.zip
└── package.json          # Project configuration
```

### Building and Packaging

```bash
# Install dependencies
npm install

# Build icons
npm run build

# Package for all browsers
npm run package-all

# Or package individually
npm run package-chrome
npm run package-firefox
```

This creates:
- `dist/share-on-bluesky-chrome.zip` - Chrome/Safari version
- `dist/share-on-bluesky-firefox.zip` - Firefox version

For detailed packaging instructions, see [PACKAGING.md](PACKAGING.md).

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the extension
5. Submit a pull request

## Troubleshooting

- **Extension not working**: Make sure you're on a regular webpage (not a browser settings page)
- **Content not extracted**: Some pages may not have proper meta tags
- **Character limit exceeded**: The extension should handle this automatically, but some edge cases may occur
