export interface ApiResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage?: number;
    limit?: number;
    totalRecords?: number;
    totalPages?: number;
  };
  statusCode: number;
  errors: {
    code?: number;
    message: string;
  };
}

// Hàm phản hồi thành công
export function successResponse<T>(
  data: T[],
  pagination: object = {},
  statusCode: number,
): ApiResponse<T> {
  return {
    success: true,
    data,
    pagination,
    statusCode,
    errors: [],
  };
}

// Hàm phản hồi lỗi
export function errorResponse<T>(
  statusCode: number,
  message: string,
): ApiResponse<T> {
  return {
    success: false,
    data: [],
    pagination: {},
    statusCode,
    errors: [
      {
        code: statusCode,
        message,
      },
    ],
  };
}
