export interface ApiResponse<T> {
  success: boolean;
  message: string;
  timestamp: string;
  data: T;
  meta?: {
    totalItems: number;
    page: number;
    size: number;
  };
}
