export interface TApiError {
  data: {
    message: string;
    success: string;
    timestamp: string;
    stack?: string;
  };
}
