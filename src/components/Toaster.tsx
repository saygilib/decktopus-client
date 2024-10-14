import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  handleClose: () => void;
}

export default function CustomizedSnackbars({
  open,
  message,
  severity,
  handleClose,
}: SnackbarProps) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
