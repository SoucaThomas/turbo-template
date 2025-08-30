import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@turbo-template/api-client';
import { showToast } from '@/lib/toast';

export const useUpload = () => {
  const { mutate: upload, isPending } = useMutation({
    mutationFn: (file: File) => apiClient.upload(file),
    onSuccess: data => {
      showToast.success(data.message);
    },
    onError: error => {
      showToast.error(error.message);
    },
  });

  return { upload, isPending };
};
