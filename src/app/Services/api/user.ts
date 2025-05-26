import axiosInstance from "./axiosInstance";

// Define the User interface based on the OpenAPI schema
export interface User {
  id: number;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  full_name: string | null;
  // Add any other fields from your User schema here
}

// Define the UserUpdate interface based on the OpenAPI schema
export interface UserUpdate {
  email?: string;
  full_name?: string;
  password?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  // Add any other fields from your UserUpdate schema here
}

// Read Users
export async function readUsers(
  skip: number = 0,
  limit: number = 100
): Promise<User[]> {
  const { data } = await axiosInstance.get<User[]>("/api/v1/users/", {
    params: { skip, limit },
  });
  return data;
}

// Read User Me
export async function readUserMe(): Promise<User> {
  const { data } = await axiosInstance.get<User>("/api/v1/users/me");
  return data;
}

// Update User Me
export async function updateUserMe(payload: UserUpdate): Promise<User> {
  const { data } = await axiosInstance.put<User>(
    "/api/v1/users/me",
    payload
  );
  return data;
}

// Read User By Id
export async function readUserById(userId: number): Promise<User> {
  const { data } = await axiosInstance.get<User>(
    `/api/v1/users/${userId}`
  );
  return data;
}

// Delete User
export async function deleteUser(userId: number): Promise<User> {
  const { data } = await axiosInstance.delete<User>(
    `/api/v1/users/${userId}`
  );
  return data;
} 