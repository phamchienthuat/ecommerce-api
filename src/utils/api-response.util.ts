export interface ApiResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page?: number;
    itemPerPage?: number;
    totalRecords?: number;
  };
  statusCode: number;
  errors: {
    code: number;
    message: string;
  } | null;
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
    errors: null,
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
    errors: {
      code: statusCode,
      message,
    },
  };
}
