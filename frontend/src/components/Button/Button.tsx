import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material";

export default function BasicButtons(props: ButtonProps) {
  return (
    <Stack spacing={2} direction="row">
      <Button {...props} />
    </Stack>
  );
}
