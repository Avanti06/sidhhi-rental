export interface User {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'provider';
    company_name?: string;
    company_logo?: File;
    gst_number?: string;
  }
  