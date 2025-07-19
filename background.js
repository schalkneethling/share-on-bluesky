// Service worker for Share on Bluesky extension (Manifest V3)
// Compatible with both Manifest V2 (Firefox) and V3 (Chrome)

// Detect browser API
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
const actionAPI = browserAPI.action || browserAPI.browserAction;

// Service worker event listeners
if (actionAPI) {
  actionAPI.onClicked.addListener(async (tab) => {
    try {
      // Send message to content script to get page data
      const response = await browserAPI.tabs.sendMessage(tab.id, { action: "getPageData" });
      
      if (response && response.success) {
        const { title, description, url } = response.data;
        
        // Create the Bluesky compose URL
        const composeUrl = createBlueskyComposeUrl(title, description, url);
        
        // Open the compose URL in a new tab
        await browserAPI.tabs.create({ url: composeUrl });
      } else {
        console.error('Failed to get page data:', response?.error);
      }
    } catch (error) {
      console.error('Error in service worker:', error);
    }
  });
}

// Service worker installation
self.addEventListener('install', (event) => {
  console.log('Share on Bluesky service worker installed');
});

// Service worker activation
self.addEventListener('activate', (event) => {
  console.log('Share on Bluesky service worker activated');
});

function createBlueskyComposeUrl(title, description, url) {
  // Remove UTM parameters from URL
  const cleanUrl = removeUtmParams(url);
  
  // Calculate available space for description
  const baseText = `${title} | ${cleanUrl}`;
  const baseLength = baseText.length;
  const maxLength = 300;
  const availableSpace = maxLength - baseLength - 3; // -3 for " | " separator
  
  let finalDescription = '';
  if (availableSpace > 0) {
    // Truncate description to fit available space
    finalDescription = description.length > availableSpace 
      ? description.substring(0, availableSpace - 3) + '...'
      : description;
  }
  
  // Construct the final text
  let postText = finalDescription 
    ? `${title} | ${finalDescription} | ${cleanUrl}`
    : `${title} | ${cleanUrl}`;
  
  // Remove duplicated text
  postText = removeDuplicatedText(postText);
  
  // URL encode the text and create the compose URL
  const encodedText = encodeURIComponent(postText);
  return `https://bsky.app/intent/compose?text=${encodedText}`;
}

function removeDuplicatedText(text) {
  if (!text) return text;
  
  // Split by pipe separator
  const parts = text.split('|').map(part => part.trim()).filter(part => part.length > 0);
  
  if (parts.length < 2) return text;
  
  // Check for duplicates between parts
  const cleanedParts = [];
  const seenPhrases = new Set();
  
  for (const part of parts) {
    // Normalize the part for comparison (lowercase, remove punctuation)
    const normalizedPart = part.toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    // Check if this normalized part is a subset of any previously seen part
    let isDuplicate = false;
    for (const seenPhrase of seenPhrases) {
      if (normalizedPart.includes(seenPhrase) || seenPhrase.includes(normalizedPart)) {
        // If the current part is longer, replace the shorter one
        if (normalizedPart.length > seenPhrase.length) {
          // Remove the shorter duplicate from cleanedParts
          const shorterIndex = cleanedParts.findIndex(p => 
            p.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim() === seenPhrase
          );
          if (shorterIndex !== -1) {
            cleanedParts.splice(shorterIndex, 1);
            seenPhrases.delete(seenPhrase);
            seenPhrases.add(normalizedPart);
            cleanedParts.push(part);
          }
        }
        isDuplicate = true;
        break;
      }
    }
    
    if (!isDuplicate) {
      cleanedParts.push(part);
      seenPhrases.add(normalizedPart);
    }
  }
  
  return cleanedParts.join(' | ');
}

function removeUtmParams(url) {
  try {
    const urlObj = new URL(url);
    const params = urlObj.searchParams;
    
    // Remove all UTM parameters
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    utmParams.forEach(param => params.delete(param));
    
    // Reconstruct URL without UTM parameters
    urlObj.search = params.toString();
    return urlObj.toString();
  } catch (error) {
    // If URL parsing fails, return original URL
    return url;
  }
} 