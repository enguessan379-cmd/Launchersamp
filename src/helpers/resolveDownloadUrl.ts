// Accepts either:
// - a plain Google Drive file ID ("1qaPjU2qk_nI50y225jS1joew1mEOJFaC")
// - a full Drive share link ("https://drive.google.com/file/d/<id>/view?...")
// - any other already-direct URL (returned unchanged)
// and returns a direct-download URL that RNFS.downloadFile can stream.
export const resolveDownloadUrl = (url: string): string => {
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  const fileId = driveMatch ? driveMatch[1] : isLikelyDriveId(url) ? url : null;

  if (fileId) {
    return `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
  }

  return url;
};

// Google Drive file IDs are typically 25-44 chars, alnum plus - and _,
// with no slashes or protocol — distinguishes a bare ID from a normal URL.
const isLikelyDriveId = (value: string): boolean =>
  /^[a-zA-Z0-9_-]{20,50}$/.test(value);
