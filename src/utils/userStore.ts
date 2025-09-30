type StoredUser = {
  username: string;
  password: string;
  phone?: string;
  address?: string;
  createdAt: string;
};

const USERS_KEY = "demo-users";

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore write errors
  }
}

export function findUser(username: string): StoredUser | undefined {
  const users = readUsers();
  return users.find((u) => u.username.toLowerCase() === username.toLowerCase());
}

export function verifyUser(username: string, password: string): boolean {
  const user = findUser(username);
  return !!user && user.password === password;
}

export function createUser(input: Omit<StoredUser, "createdAt">):
  | {
      ok: true;
      user: StoredUser;
    }
  | { ok: false; error: string } {
  const users = readUsers();
  if (
    users.some((u) => u.username.toLowerCase() === input.username.toLowerCase())
  ) {
    return { ok: false, error: "Korisničko ime je zauzeto" };
  }
  const newUser: StoredUser = { ...input, createdAt: new Date().toISOString() };
  users.push(newUser);
  writeUsers(users);
  return { ok: true, user: newUser };
}

export const ADMIN_USERNAME = "organizator";

export function ensureAdminUser() {
  const users = readUsers();
  const exists = users.some(
    (u) => u.username.toLowerCase() === ADMIN_USERNAME.toLowerCase()
  );
  if (!exists) {
    const adminUser: StoredUser = {
      username: ADMIN_USERNAME,
      password: "admin",
      phone: "+381 64 33 66 999",
      address: "Bulevar Kralja Aleksandra 75",
      createdAt: new Date().toISOString(),
    };
    users.push(adminUser);
    writeUsers(users);
  }
}

export function updateUser(
  currentUsername: string,
  updates: { username?: string; phone?: string; address?: string }
): { ok: true; user: StoredUser } | { ok: false; error: string } {
  const users = readUsers();
  const idx = users.findIndex(
    (u) => u.username.toLowerCase() === currentUsername.toLowerCase()
  );
  if (idx === -1) {
    return { ok: false, error: "Korisnik nije pronađen" };
  }

  const desiredUsername = updates.username?.trim();
  if (
    desiredUsername &&
    desiredUsername.toLowerCase() !== currentUsername.toLowerCase()
  ) {
    const taken = users.some(
      (u, i) =>
        i !== idx && u.username.toLowerCase() === desiredUsername.toLowerCase()
    );
    if (taken) {
      return { ok: false, error: "Korisničko ime je zauzeto" };
    }
  }

  const existing = users[idx];
  const updated: StoredUser = {
    ...existing,
    username:
      desiredUsername && desiredUsername.length > 0
        ? desiredUsername
        : existing.username,
    phone: updates.phone ?? existing.phone,
    address: updates.address ?? existing.address,
  };
  users[idx] = updated;
  writeUsers(users);
  return { ok: true, user: updated };
}

export function changePassword(
  username: string,
  oldPassword: string,
  newPassword: string
): { ok: true } | { ok: false; error: string } {
  const users = readUsers();
  const idx = users.findIndex(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );
  if (idx === -1) {
    return { ok: false, error: "Korisnik nije pronađen" };
  }
  const user = users[idx];
  if (user.password !== oldPassword) {
    return { ok: false, error: "Stara lozinka nije tačna" };
  }
  users[idx] = { ...user, password: newPassword };
  writeUsers(users);
  return { ok: true };
}

// Seed the admin user at module load to ensure credentials always work
ensureAdminUser();
