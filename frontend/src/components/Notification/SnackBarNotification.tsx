import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar, { type SnackbarOrigin } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// interface State extends SnackbarOrigin {
//   open: boolean;
// }

interface SnackBarNotificationProps {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  onClose: () => void;
}
export default function SnackBarNotification({
  open,
  onClose,
  severity,
  message,
}: SnackBarNotificationProps) {
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        transitionDuration={500}
        autoHideDuration={3000}
        onClose={onClose}
        //key={vertical + horizontal}
      >
        <Alert
          // onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
