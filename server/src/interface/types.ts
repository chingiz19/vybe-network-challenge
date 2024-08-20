type Data<T> = T | {};

export interface ApiResponse<T> {
  success: boolean;
  data: Data<T>;
  message?: string; // Optional field with a default message for user
  devMessage?: string; // Optional field for developer-specific messages

  toJson(): {
    success: boolean;
    data: Data<T>;
    message?: string;
    devMessage?: string;
  };
}

export class SuccessResponse<T> implements ApiResponse<T> {
  success: boolean = true;
  data: Data<T>;
  message?: string;
  devMessage?: string;

  constructor(data?: T, message?: string, devMessage?: string) {
    this.data = data || {};
    this.message = message || "Request completed successfully";
    this.devMessage = devMessage;
  }

  toJson() {
    return {
      success: this.success,
      data: this.data,
      message: this.message,
      devMessage: this.devMessage,
    };
  }
}

export class ErrorResponse implements ApiResponse<null> {
  success: boolean = false;
  data: Data<{}> = {}; // empty data on unsuccessfull responses
  message?: string;
  devMessage?: string;

  constructor(message?: string, devMessage?: string) {
    this.message = message || "Request failed";
    this.devMessage = devMessage;
  }

  toJson() {
    return {
      success: this.success,
      data: this.data,
      message: this.message,
      devMessage: this.devMessage,
    };
  }
}
