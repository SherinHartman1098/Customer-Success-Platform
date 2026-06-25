import type { GridColDef } from "@mui/x-data-grid";
import DataGrid from "../../components/DataGrid/DataGrid";
import { useCustomerList } from "./useCustomerList";
import Box from "@mui/material/Box";
import Button from "../../components/Button/Button";
import FormDialog from "../../components/Dialog/FormDialog";
import TextInput from "../../components/TextInput/TextInput";
import Dropdown from "../../components/Dropdown/Dropdown";
import type { CustomerStatus } from "../../types/customer.types";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchBar from "../../components/SearchBar/SearchBar";

export function CustomerListPage() {
  const {
    fetchCustomers,
    customers,
    loading,
    openFormDialog,
    formData,
    setFormData,
    handleOpenFormDialog,
    handleCloseFormDialog,
    handleFormDialogChange,
    handleFormSubmit,
    selectedCustomer,
    setSelectedCustomer,
    handleOpenEditDialog,
    dialogMode,
    searchQuery,
    setSearchQuery,
    filteredCustomers,
  } = useCustomerList();

  const selectLabel = "Status";
  const fields = [
    { id: "companyName", name: "companyName", label: "Company Name" },
    { id: "contactName", name: "contactName", label: "Contact Name" },
    { id: "email", name: "email", label: "Email", type: "email" },
    { id: "phone", name: "phone", label: "Phone" },
    { id: "industry", name: "industry", label: "Industry" },
    // {id: "status", name: "status", label: "Status", type: "select" },
  ];

  const statusOptions = [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
  ];

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

  return (
    <>
      <Box sx={{ px: { xs: 2, md: 6 }, py: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleOpenFormDialog}
            >
              Add Customer
            </Button>

            <Button
              variant="outlined"
              size="small"
              disabled={!selectedCustomer}
              onClick={handleOpenEditDialog}
            >
              Edit Customer
            </Button>
            <IconButton
              aria-label="refresh"
              //color="secondary"
              onClick={fetchCustomers}
            >
              <RefreshIcon />
            </IconButton>
          </Box>
          <Box sx={{ width: 350 }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </Box>
        </Box>
        <DataGrid
          columns={columns}
          rows={filteredCustomers}
          loading={loading}
          onRowSelect={setSelectedCustomer}
        />
        <FormDialog
          open={openFormDialog}
          onClose={handleCloseFormDialog}
          title={dialogMode === "add" ? "Add Customer" : "Edit Customer"}
          onSubmit={handleFormSubmit}
        >
          {fields.map((field) => (
            <TextInput
              key={field.id}
              id={field.id}
              name={field.name}
              label={field.label}
              type={field.type}
              value={formData[field.name as keyof typeof formData] || ""}
              onChange={handleFormDialogChange}
            />
          ))}
          <Dropdown
            label={selectLabel}
            options={statusOptions}
            value={formData.status}
            onChange={(event) =>
              setFormData({
                ...formData,
                status: event.target.value as CustomerStatus,
              })
            }
          />
        </FormDialog>
      </Box>
    </>
  );
}
