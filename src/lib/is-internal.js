export function isInternal(url) {
  // Example logic to determine if a URL is internal
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname === 'yourdomain.com';
  } catch (error) {
    return false; // Return false if URL parsing fails
  }
}
