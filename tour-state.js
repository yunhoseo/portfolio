/** The last chapter to cross the reading line owns the camera. */
export function activeChapter(tops, readingLine) {
  let active = -1;
  for (let i=0;i<tops.length;i++) if(tops[i]<=readingLine) active=i;
  return active;
}
export function chapterDestination(documentTop, readingOffset) {
  return Math.max(0,documentTop-readingOffset);
}
export function parseProjectHash(hash, validIds) {
  if(!hash.startsWith('#project/')) return null;
  try {const id=decodeURIComponent(hash.slice(9));return validIds.includes(id)?id:null;}
  catch {return null;}
}
