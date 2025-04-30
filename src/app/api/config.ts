// Central place to manage API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://eduassist-6uef.onrender.com/api/v1"

export const getAuthHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
})

export const handleApiError = (error: any) => {
  if (error.status === 401) {
    // Handle unauthorized error (e.g., redirect to login)
    return { message: "Authentication required. Please log in again." }
  }

  if (error.status === 403) {
    return { message: "You don't have permission to perform this action." }
  }

  if (error.status === 404) {
    return { message: "The requested resource was not found." }
  }

  if (error.status === 422) {
    // Handle validation errors
    const validationErrors = error.data?.detail || []
    if (validationErrors.length > 0) {
      return {
        message: "Validation error",
        errors: validationErrors.map((err: any) => ({
          field: err.loc.join("."),
          message: err.msg,
        })),
      }
    }
  }

  // Default error handling
  return {
    message: error.data?.message || error.error || "An unexpected error occurred. Please try again later.",
  }
}
