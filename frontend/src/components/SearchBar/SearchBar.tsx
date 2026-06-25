import TextInput from "../TextInput/TextInput";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};
export default function SearchBar({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  return (
    <TextInput
      label="Search"
      variant="outlined"
      size="small"
      placeholder={placeholder}
      sx={{ width: "300px" }}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
