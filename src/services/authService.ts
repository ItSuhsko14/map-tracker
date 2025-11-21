export async function loginRequest(code: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Login failed');
  }

  return true;
}

export async function logoutRequest() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Logout failed');
  }

  return true;
}
