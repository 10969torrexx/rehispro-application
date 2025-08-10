export async function login(username, password) {
  if (!username || !password) {
    return { success: false, message: "Username and password are required" };
  }

  // Call Electron main process via preload API
  const result = await window.api.login(username, password);

  if (!result.success) {
    return { success: false, message: result.message };
  }

  // Example: save user data in localStorage
  localStorage.setItem("user", JSON.stringify(result.user));

  return { success: true, user: result.user };
}

export function logout() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
