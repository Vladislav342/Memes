import { ToastProvider } from '@heroui/toast';

export const Toast = () => (
  <ToastProvider
    toastProps={{
      radius: 'full',
      color: 'primary',
      variant: 'flat',
      timeout: 5000,
      hideIcon: true,
      classNames: {
        closeButton: 'opacity-100 absolute right-8 top-1/2 -translate-y-1/2',
      },
    }}
  />
);
