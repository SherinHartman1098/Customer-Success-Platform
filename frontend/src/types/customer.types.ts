export interface Customer {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  industry?: string;
  status: CustomerStatus;
}

export type CustomerStatus = "ACTIVE" | "INACTIVE";
