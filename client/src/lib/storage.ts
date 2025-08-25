const ADMIN_PASSWORD = 'admin123';

export function isAdminAuthenticated(): boolean {
  return localStorage.getItem('admin_authenticated') === 'true';
}

export function authenticateAdmin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem('admin_authenticated', 'true');
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  localStorage.removeItem('admin_authenticated');
}
