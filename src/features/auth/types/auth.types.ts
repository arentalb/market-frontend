export interface User {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface AuthState {
  user: User | null;
}
