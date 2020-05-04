import decode from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('@dashboard/token');
  const user = localStorage.getItem('@dashboard/user');

  if (!token) return false;

  try {
    decode(token, { header: true });
    const { uid, exp } = decode(token);

    if (uid !== parseInt(user) || exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
};
