import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

export const useCustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await api.get("/customer/getAllCustomers");
        console.log("Fetched customers:", response.data);
        setCustomers(response.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return {
    customers,
    loading,
    error,
  };
};
