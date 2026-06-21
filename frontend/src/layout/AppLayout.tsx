import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar/NavBar";
import { Box } from "@mui/material";
export function AppLayout() {
  return (
    <div>
      <Navbar />
      <Box sx={{ mt: 10 }}></Box>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
