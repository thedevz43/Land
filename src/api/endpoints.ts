import { API_BASE_URL } from '@/utils/constants';

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    // Simulated API call
    return fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  },
  
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    aadhaar?: string;
    phone?: string;
  }) => {
    return fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  },
  
  logout: async () => {
    return fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
    });
  },
  
  getCurrentUser: async () => {
    return fetch(`${API_BASE_URL}/auth/me`);
  },
};

// Land Parcels API
export const landParcelsApi = {
  search: async (params: {
    surveyNumber?: string;
    ownerName?: string;
    village?: string;
    taluk?: string;
    district?: string;
    state?: string;
  }) => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    return fetch(`${API_BASE_URL}/land-parcels/search?${queryString}`);
  },
  
  getById: async (id: string) => {
    return fetch(`${API_BASE_URL}/land-parcels/${id}`);
  },
  
  getByOwner: async (ownerId: string) => {
    return fetch(`${API_BASE_URL}/land-parcels/owner/${ownerId}`);
  },
};

// Mutation Requests API
export const mutationApi = {
  create: async (mutationData: {
    surveyNumber: string;
    mutationType: string;
    previousOwner: string;
    newOwner: string;
    documents: string[];
  }) => {
    return fetch(`${API_BASE_URL}/mutations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mutationData),
    });
  },
  
  getAll: async (status?: string) => {
    const queryString = status ? `?status=${status}` : '';
    return fetch(`${API_BASE_URL}/mutations${queryString}`);
  },
  
  getById: async (id: string) => {
    return fetch(`${API_BASE_URL}/mutations/${id}`);
  },
  
  updateStatus: async (id: string, status: string, remarks?: string) => {
    return fetch(`${API_BASE_URL}/mutations/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, remarks }),
    });
  },
};

// Tax Records API
export const taxApi = {
  getByOwner: async (ownerId: string) => {
    return fetch(`${API_BASE_URL}/tax/owner/${ownerId}`);
  },
  
  getBySurveyNumber: async (surveyNumber: string) => {
    return fetch(`${API_BASE_URL}/tax/survey/${surveyNumber}`);
  },
  
  initiatePayment: async (taxId: string, amount: number) => {
    return fetch(`${API_BASE_URL}/tax/${taxId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
  },
  
  getReceipt: async (paymentId: string) => {
    return fetch(`${API_BASE_URL}/tax/receipt/${paymentId}`);
  },
};

// Document Upload API
export const documentsApi = {
  upload: async (file: File, parcelId: string, documentType: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('parcelId', parcelId);
    formData.append('documentType', documentType);
    
    return fetch(`${API_BASE_URL}/documents/upload`, {
      method: 'POST',
      body: formData,
    });
  },
  
  getByParcel: async (parcelId: string) => {
    return fetch(`${API_BASE_URL}/documents/parcel/${parcelId}`);
  },
  
  download: async (documentId: string) => {
    return fetch(`${API_BASE_URL}/documents/${documentId}/download`);
  },
  
  delete: async (documentId: string) => {
    return fetch(`${API_BASE_URL}/documents/${documentId}`, {
      method: 'DELETE',
    });
  },
};

// User Management API (Admin)
export const userManagementApi = {
  getAll: async (page?: number, limit?: number) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    return fetch(`${API_BASE_URL}/users?${params.toString()}`);
  },
  
  getById: async (id: string) => {
    return fetch(`${API_BASE_URL}/users/${id}`);
  },
  
  updateRole: async (id: string, role: string) => {
    return fetch(`${API_BASE_URL}/users/${id}/role`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
  },
  
  deactivate: async (id: string) => {
    return fetch(`${API_BASE_URL}/users/${id}/deactivate`, {
      method: 'POST',
    });
  },
  
  getActivityLogs: async (filters?: { userId?: string; action?: string; dateFrom?: string; dateTo?: string }) => {
    const params = new URLSearchParams(filters as Record<string, string>);
    return fetch(`${API_BASE_URL}/users/logs?${params.toString()}`);
  },
};
