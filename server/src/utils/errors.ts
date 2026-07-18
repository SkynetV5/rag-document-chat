export class AppError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode = 500, options?: { cause?: unknown }) {
      super(message);
      this.name = "AppError";
      this.statusCode = statusCode;
  
      if (options?.cause) {
        this.cause = options.cause as Error;
      }
    }
  }