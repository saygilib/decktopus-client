import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import LocalStorageActions from "../utils/localStorageActions";

interface AuthContextType {
  user: string | null;
  login: (username: string, token: string, userid: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("username");

    if (token && savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = (username: string, token: string, userid: string) => {
    LocalStorageActions.setToken(token);
    LocalStorageActions.setUser(username, userid);
    setUser(username);
  };

  const logout = () => {
    LocalStorageActions.clearStorage();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {!loading ? children : <div>Loading...</div>} 
    </AuthContext.Provider>
  );
};
