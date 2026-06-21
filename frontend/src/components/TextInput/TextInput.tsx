import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material";

export default function TextInput(props: TextFieldProps) {

  return (

    <Box sx={{ m: 1, width: "45ch" }}>

      <TextField {...props} fullWidth />

    </Box>

  );

}

