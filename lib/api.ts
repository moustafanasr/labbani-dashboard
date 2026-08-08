import axios from "axios";
import type { Branch, BranchInput } from "@/types/branch";

export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api" });
export const branchesApi = {
  list: async () => (await api.get<Branch[]>("/branches")).data,
  create: async (data: BranchInput) => (await api.post<Branch>("/branches", data)).data,
  update: async (id: string, data: BranchInput) => (await api.put<Branch>(`/branches/${id}`, data)).data,
  remove: async (id: string) => { await api.delete(`/branches/${id}`); },
};
