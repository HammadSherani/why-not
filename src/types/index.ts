export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: string;
  issues?: Record<string, string[] | undefined>;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
