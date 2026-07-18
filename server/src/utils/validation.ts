import { AppError } from "./errors";

export function validateRequiredString(value: unknown, fieldName: string): string {
    if (typeof value !== "string" || value.trim() === ""){
        throw new AppError(`${fieldName} is required`, 400);
    }

    return value.trim();
}

export function validateId(value: unknown, fieldName: string): string {
    const id = validateRequiredString(value, fieldName);
    if (!/^[a-zA-Z0-9-_]+$/.test(id)) {
      throw new AppError(`${fieldName} is invalid`, 400);
    }
    return id;
  }
  
export function validateRole(value: unknown): string {
    const role = validateRequiredString(value, "role");
    if (!["user", "assistant"].includes(role)) {
      throw new AppError("role must be one of: user, assistant", 400);
    }
    return role;
  }

export const asyncHandler =
(fn: (req: any, res: any, next: any) => Promise<any>) =>
(req: any, res: any, next: any) =>
Promise.resolve(fn(req, res, next)).catch(next);