/**
 * TODO: handle the login process sending post request to expresss js
 * @param {*} loginId 
 * @param {*} password 
 * @returns 
 */
export async function Login (loginId, password) {
  if (!loginId || !password) {
    return { success: false, message: "Login ID and password are required" };
  }
  
  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login_id: loginId,
        password: password,
      }),
    });

    let parseResponse = await response.json();

    let loggedInUser = {
      id: parseResponse.user.id,
      login_id: parseResponse.user.login_id,
      role: parseResponse.user.role,
      is_firsttime_flg: parseResponse.user.is_firsttime_flg
    };

    localStorage.setItem("user", JSON.stringify(loggedInUser));

    return parseResponse;
  } catch (error) {
    console.error("Login request failed, error:", error);
    return { success: false, message: "Unable to connect to the server" };
  }
}

export function logout() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
