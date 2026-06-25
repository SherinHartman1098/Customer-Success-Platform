import TextInput from "../TextInput/TextInput";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <TextInput
      label="Search"
      variant="outlined"
      size="small"
      sx={{ width: "300px" }}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
