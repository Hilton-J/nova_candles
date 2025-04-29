// Interface to describe the issue
interface ZodIssue {
  path: string[];
  message: string;
}

// Function that handles the ZodError
export const extractErrorMessage = (err: unknown): string => {
  const maybeError = err as {
    data?: {
      message?: string;
      errors?: ZodIssue[];
    };
  };

  // Zod Validation Errors
  if (maybeError.data?.errors?.length) {
    return maybeError.data.errors
      .map((e) => `${e.path}: ${e.message}`)
      .join(" | ");
  }

  // Default message
  return maybeError.data?.message || "An unexpected error occurred.";
};
