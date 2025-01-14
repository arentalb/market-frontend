export interface User {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface AuthState {
  user: User | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
