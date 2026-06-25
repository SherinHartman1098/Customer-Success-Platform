import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type FormDialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  contentText?: string;
  children?: React.ReactNode;
  onSubmit?: (formData: any) => void;
};
// type FormFieldProps = {
//   id: string;
//   name: string;
//   label: string;
//   type?: string;
// };
export default function FormDialog({
  open,
  onClose,
  title,
  contentText,
  children,
  onSubmit,
}: FormDialogProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    onSubmit?.(formJson);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {contentText && (
          <DialogContentText sx={{ mb: 2 }}>{contentText}</DialogContentText>
        )}

        <form onSubmit={handleSubmit} id="dialog-form">
          {children}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="dialog-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
