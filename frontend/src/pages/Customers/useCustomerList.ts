import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import type { Customer } from "../../types/customer.types";
import {useNotification} from "../../context/NotificationContext";


export const useCustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [formData, setFormData] = useState<Customer>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    industry: "",
    status: "ACTIVE", // Default status
  });

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter((customer) => {
    const search = searchQuery.toLowerCase();
    return (
      customer.companyName?.toLowerCase().includes(search) ||
      customer.contactName?.toLowerCase().includes(search)
    );
  });

  const { notify } = useNotification();

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/customer/getAllCustomers");
      console.log("Fetched customers:", response.data);
     // notify(response.data.message, "success");
      setCustomers(response.data);
    } catch (err: any) {
      // setError(err?.response?.data?.message || "Failed to fetch customers");
      notify(err?.response?.data?.message || "Failed to fetch customers", "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleOpenFormDialog = () => {
    setDialogMode("add");
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      industry: "",
      status: "ACTIVE", // Default status
    });
    setOpenFormDialog(true);
  };

  const handleOpenEditDialog = () => {
    if (!selectedCustomer) return;
    console.log("Selected customer for editing:", selectedCustomer);
    setDialogMode("edit");
    setFormData(selectedCustomer); //prepopulate the form
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };
  const handleFormDialogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (data: Customer) => {
    try {
      setLoading(true);
      if (dialogMode === "add") {
        const response = await api.post("/customer/createCustomer", data);
        notify(response.data.message, "success");
        console.log("Customer created:", response.data);
        setCustomers([...customers, response.data.customer]);
      } else if (dialogMode === "edit" && selectedCustomer) {
        const customerId =
          (selectedCustomer as any).id ?? (selectedCustomer as any).customerId;
        console.log("Updating customer with ID:", customerId, "Data:", data);
        if (!customerId) {
          // setError("Missing customer identifier");
          notify("Missing customer identifier", "error");
          return;
        }
        const response = await api.put(
          `/customer/updateCustomerProfile/${customerId}`,
          data,
        );
        notify(response.data.message, "success");
        console.log("Customer updated:", response.data);
        setCustomers(
          customers.map((customer) =>
            ((customer as any).id ?? (customer as any).customerId) ===
            customerId
              ? response.data.customer
              : customer,
          ),
        );
      }
      handleCloseFormDialog();
    } catch (err: any) {
     // setError(err?.response?.data?.message || "Failed to create customer");
      notify(err?.response?.data?.message || "Failed to create customer", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchCustomers,
    customers,
    loading,
    error,
    openFormDialog,
    setOpenFormDialog,
    handleOpenFormDialog,
    handleCloseFormDialog,
    formData,
    setFormData,
    handleFormDialogChange,
    handleFormSubmit,
    selectedCustomer,
    setSelectedCustomer,
    handleOpenEditDialog,
    dialogMode,
    searchQuery,
    setSearchQuery,
    filteredCustomers,
  };
};
