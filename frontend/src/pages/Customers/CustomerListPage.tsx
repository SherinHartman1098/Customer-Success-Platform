import DataGrid from "../../components/DataGrid/DataGrid";
import { useCustomerList } from "./useCustomerList";

export function CustomerListPage() {
  const { customers, loading } = useCustomerList();
  const columns = [
    { id: "companyName", label: "Company" },
    { id: "contactName", label: "Contact" },
    { id: "email", label: "Email" },
    { id: "industry", label: "Industry" },
    { id: "status", label: "Status" },
  ];
  return <DataGrid columns={columns} rows={customers} loading={loading} />;
}
