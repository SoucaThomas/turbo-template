import { toast } from 'sonner';

export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast.info(message),
  warning: (message: string) => toast.warning(message),
  loading: (message: string) => toast.loading(message),
  dismiss: (toastId: string | number) => toast.dismiss(toastId),
};

export const commonToasts = {
  saved: () => showToast.success('Changes saved successfully!'),
  error: () => showToast.error('Something went wrong. Please try again.'),
  loading: () => showToast.loading('Processing...'),
  networkError: () =>
    showToast.error('Network error. Please check your connection.'),
  unauthorized: () =>
    showToast.error('You are not authorized to perform this action.'),
  validationError: (field: string) =>
    showToast.error(`Please check your ${field} input.`),
};
