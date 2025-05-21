const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function login(username, password) {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throwApiError("Login failed", response);
    }
  
    const result = await response.json();
    localStorage.setItem("accessToken", result.accessToken); 
    localStorage.setItem("username", result.username);
    return result;
  }  

export async function register(username, password, email) {
    const response = await fetch(`${API_BASE}/auth/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ username, password, email }),
    });

    if (!response.ok) {
        throwApiError("Registration failed", response);
    }

    return await response.json();
}

export async function getProfile() {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });

  if (res.status === 403 || res.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    throw new Error("Unauthorized");
  }

  return res.json();
}

export async function logout() {
  try {
    const res = await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });

    // Удаляем токен даже если произошла ошибка
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");

    if (!res.ok) {
      throwApiError("Logout failed", res);
    }
  } catch (e) {
    // Защита от сбоев запроса — токен всё равно удаляем
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    throw e;
  }
}

export async function updateProfile({ username, password, email }) {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch(`${API_BASE}/auth`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
        credentials: "include",
        body: JSON.stringify({ username, password, email }),
    });

    if (!response.ok) {
        throwApiError("Update failed", response);
    }

    return await response.json();
}

export async function deleteProfile() {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch(`${API_BASE}/auth/delete`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        credentials: "include",
    });

    if (!response.ok) {
        throwApiError("Delete failed", response);
    }
}

export async function handleApiError(err, fallbackMessage, setError = null) {
    if (err.response) {
        try {
            const errorData = await err.response.json();

            if (setError) {
                if (errorData.message) {
                    setError(errorData.message);
                } else {
                    const allMessages = Object.entries(errorData)
                        .map(([field, message]) => `${field}: ${message}`)
                        .join(" | ");
                    setError(allMessages || fallbackMessage);
                }
            } else {
                alert(errorData.message || fallbackMessage);
            }
        } catch {
            setError
                ? setError(`${fallbackMessage} (response parsing error)`)
                : alert(`${fallbackMessage} (response parsing error)`);
        }
    } else {
        setError
            ? setError(err.message || fallbackMessage)
            : alert(err.message || fallbackMessage);
    }
}

function throwApiError(message, response) {
    const err = new Error(message);
    err.response = response;
    throw err;
}