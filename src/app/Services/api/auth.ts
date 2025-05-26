import axiosInstance from "./axiosInstance";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  username: string;
  full_name: string;
  password: string;
  is_active: boolean;
  is_superuser: boolean;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
}

// Login user and return access token info
export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>(
    "/api/v1/auth/login",
    payload
  );
  return data;
}

// Register new user and return access token info
export async function registerUser(
  payload: RegisterPayload
): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>(
    "/api/v1/auth/register",
    payload
  );
  return data;
}
