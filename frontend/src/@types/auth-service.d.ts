export interface AuthServiceProps {
  login: (username: string, password: string) => any;
  logout: () => void;
  isLoggedIn: () => void;
  error: string;
}
