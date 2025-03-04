import axios, { AxiosRequestConfig } from "axios";
import { Ticket, AuthResponse, UserCredentials } from "../types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/",
});

// get auth headers
const getAuthConfig = (token: string | null): AxiosRequestConfig => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// API request functions
export const signup = async (credentials: UserCredentials): Promise<void> => {
  await axiosInstance.post("/auth/signup", credentials);
};

export const login = async (
  credentials: UserCredentials
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/auth/login",
    credentials
  );
  return response.data;
};

export const getAllTickets = async (
  token: string | null
): Promise<Ticket[]> => {
  const response = await axiosInstance.get<Ticket[]>(
    "/tickets",
    getAuthConfig(token)
  );
  return response.data;
};

export const getTicket = async (
  id: string,
  token: string | null
): Promise<Ticket> => {
  const response = await axiosInstance.get<Ticket>(
    `/tickets/${id}`,
    getAuthConfig(token)
  );
  return response.data;
};

export const createTicket = async (
  ticketData: Partial<Ticket>,
  token: string | null
): Promise<Ticket> => {
  const response = await axiosInstance.post<Ticket>(
    "/tickets",
    ticketData,
    getAuthConfig(token)
  );
  return response.data;
};

export const updateTicket = async (
  id: string,
  ticketData: Partial<Ticket>,
  token: string | null
): Promise<Ticket> => {
  const response = await axiosInstance.put<Ticket>(
    `/tickets/${id}`,
    ticketData,
    getAuthConfig(token)
  );
  return response.data;
};
