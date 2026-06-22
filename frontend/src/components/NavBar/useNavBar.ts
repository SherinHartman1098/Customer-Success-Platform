import { logoutUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export const useNavbar = () => {
  const navigate = useNavigate();
  const handleMenuAction = async (action: string) => {
    switch (action) {
      case "Profile":
        // Navigate to profile page
        alert("Navigate to profile page");
        break;
      case "Account":
        alert("Navigate to account page");
        break;
      case "Dashboard":
        alert("Navigate to Dashboard page");
        break;
      case "Logout":
        // Perform logout action
        await logoutUser();
        navigate("/login");
        // alert("Perform logout action");
        break;
      default:
        break;
    }
  };

  return { handleMenuAction };
};
