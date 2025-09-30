export type CommentItem = {
  id: string;
  offerId: string;
  username: string;
  rating: number; // 1-5
  text: string;
  createdAt: string;
};

const COMMENTS_KEY = "demo-offer-comments";

function readComments(): CommentItem[] {
  try {
    const raw = localStorage.getItem(COMMENTS_KEY);
    return raw ? (JSON.parse(raw) as CommentItem[]) : [];
  } catch {
    return [];
  }
}

function writeComments(items: CommentItem[]) {
  try {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function listCommentsForOffer(offerId: string): CommentItem[] {
  return readComments()
    .filter((c) => c.offerId === offerId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addComment(
  input: Omit<CommentItem, "id" | "createdAt">
): CommentItem {
  const all = readComments();
  const item: CommentItem = {
    ...input,
    id: `cm_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  all.push(item);
  writeComments(all);
  return item;
}
