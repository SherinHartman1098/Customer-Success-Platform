import type { GridColDef } from "@mui/x-data-grid";
import DataGrid from "../../components/DataGrid/DataGrid";
import { useCustomerList } from "./useCustomerList";

export function CustomerListPage() {
  const { customers, loading } = useCustomerList();
  const columns: GridColDef[] = [
    {
      field: "companyName",
      headerName: "Company Name",
      flex: 1,
    },

    {
      field: "contactName",
      headerName: "Contact Name",
      flex: 1,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];
  return <DataGrid columns={columns} rows={customers} loading={loading} />;
}
