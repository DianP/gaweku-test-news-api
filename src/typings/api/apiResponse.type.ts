export interface ApiResponse {
  status: 'success' | 'error';
  code: number;
  data?: object | object[];
  error?: object | object[];
}
