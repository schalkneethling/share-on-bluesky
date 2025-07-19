const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create a file to stream archive data to
const output = fs.createWriteStream(path.join(distDir, 'share-on-bluesky-chrome.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log('✅ Chrome extension packaged successfully!');
  console.log(`📦 Archive size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  console.log('📁 Output: dist/share-on-bluesky-chrome.zip');
});

// Good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('⚠️  Warning:', err);
  } else {
    throw err;
  }
});

// Good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files for Chrome/Safari version
const filesToAdd = [
  'manifest.json',
  'background.js',
  'content.js',
  'package.json',
  'README.md',
  'LICENSE',
  'test.html'
];

// Add files to archive
filesToAdd.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    if (fs.statSync(filePath).isDirectory()) {
      archive.directory(filePath, file);
    } else {
      archive.file(filePath, { name: file });
    }
    console.log(`📄 Added: ${file}`);
  } else {
    console.warn(`⚠️  File not found: ${file}`);
  }
});

// Add icons directory structure (this includes all icon files)
const iconsDir = path.join(__dirname, '..', 'icons');
if (fs.existsSync(iconsDir)) {
  archive.directory(iconsDir, 'icons');
  console.log('📁 Added: icons/ directory');
}

// Finalize the archive
archive.finalize(); 