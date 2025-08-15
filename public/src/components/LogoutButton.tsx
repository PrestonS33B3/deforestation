// components/LogoutButton.tsx
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
  setIsAuthenticated: (val: boolean) => void;
}

const LogoutButton = ({ setIsAuthenticated }: LogoutButtonProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT or session token
    setIsAuthenticated(false);
    navigate("/auth");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md text-red-500 font-semibold"
    >
      Logout
    </button>
  );
};

export default LogoutButton;