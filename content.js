// Content script for Share on Bluesky extension
// Detect browser API
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageData") {
    try {
      const pageData = extractPageData();
      sendResponse({ success: true, data: pageData });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }
  return true; // Keep the message channel open for async response
});

function extractPageData() {
  const title = getPageTitle();
  const description = getPageDescription();
  const url = window.location.href;
  
  return { title, description, url };
}

function getPageTitle() {
  // Try to get og:title first
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && ogTitle.content && ogTitle.content.trim()) {
    return cleanContent(ogTitle.content.trim());
  }
  
  // Fallback to page title
  const pageTitle = document.title;
  if (pageTitle && pageTitle.trim()) {
    return cleanContent(pageTitle.trim());
  }
  
  // Final fallback
  return 'Shared Page';
}

function getPageDescription() {
  // Try to get og:description first
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription && ogDescription.content && ogDescription.content.trim()) {
    return cleanContent(ogDescription.content.trim());
  }
  
  // Fallback to meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && metaDescription.content && metaDescription.content.trim()) {
    return cleanContent(metaDescription.content.trim());
  }
  
  // Try to get description from other common meta tags
  const descriptionSelectors = [
    'meta[name="Description"]',
    'meta[property="description"]',
    'meta[name="twitter:description"]'
  ];
  
  for (const selector of descriptionSelectors) {
    const element = document.querySelector(selector);
    if (element && element.content && element.content.trim()) {
      return cleanContent(element.content.trim());
    }
  }
  
  return '';
}

function cleanContent(content) {
  if (!content) return content;
  
  // Remove GitHub copyright notices
  const githubCopyrightPatterns = [
    /©\s*\d{4}\s*GitHub,\s*Inc\.?/gi,
    /©\s*GitHub,\s*Inc\.?/gi,
    /GitHub,\s*Inc\.?/gi
  ];
  
  // Remove GitHub "Contribute to" messages
  const githubContributePatterns = [
    /Contribute\s+to\s+[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\s+development\s+by\s+creating\s+an\s+account\s+on\s+GitHub\.?/gi,
    /Contribute\s+to\s+[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\s+development\s+by\s+creating\s+an\s+account\s+on\s+GitHub/gi
  ];
  
  let cleanedContent = content;
  
  // Apply each pattern to remove GitHub copyright text
  githubCopyrightPatterns.forEach(pattern => {
    cleanedContent = cleanedContent.replace(pattern, '');
  });
  
  // Apply each pattern to remove GitHub contribute messages
  githubContributePatterns.forEach(pattern => {
    cleanedContent = cleanedContent.replace(pattern, '');
  });
  
  // Clean up extra whitespace and punctuation that might be left
  cleanedContent = cleanedContent
    .replace(/\s*[|•]\s*$/, '') // Remove trailing separators
    .replace(/^\s*[|•]\s*/, '') // Remove leading separators
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  return cleanedContent;
} 