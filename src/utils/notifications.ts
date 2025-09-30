export type NotificationItem = {
  id: string;
  username: string; // recipient
  title: string;
  message: string;
  createdAt: string;
};

const NOTIFICATIONS_KEY = "demo-notifications";

function readNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    return raw ? (JSON.parse(raw) as NotificationItem[]) : [];
  } catch {
    return [];
  }
}

function writeNotifications(items: NotificationItem[]) {
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function listNotificationsForUser(username: string): NotificationItem[] {
  return readNotifications()
    .filter((n) => n.username.toLowerCase() === username.toLowerCase())
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addNotification(
  input: Omit<NotificationItem, "id" | "createdAt">
) {
  const all = readNotifications();
  const item: NotificationItem = {
    ...input,
    id: `nt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  all.push(item);
  writeNotifications(all);
}

export function clearNotificationsForUser(username: string) {
  const all = readNotifications();
  const remaining = all.filter(
    (n) => n.username.toLowerCase() !== username.toLowerCase()
  );
  writeNotifications(remaining);
}
