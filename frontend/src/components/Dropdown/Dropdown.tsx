import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

type DropdownProps = {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  children?: React.ReactNode;
  onChange: (event: SelectChangeEvent) => void;
};
export default function Dropdown({
  label,
  options,
  value,
  onChange,
}: DropdownProps) {
  return (
    <Box sx={{ m: 1, width: "45ch" }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select label={label} value={value} onChange={onChange}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
