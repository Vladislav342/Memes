import { IToast } from '@/types/IToast';
import { addToast } from '@heroui/toast';

export const makeLongLinkShort = (str: string) => {
  let strLength: number = str.length;
  if (strLength > 30) {
    let newStr = str.slice(0, 30);
    return newStr + '...';
  }

  return str;
};

export let createToast = (params: IToast) =>
  addToast({
    title: params.title,
    description: params.desc,
    color: params.typeToast === 'success' ? 'success' : 'danger',
    classNames: {
      base: [
        'border border-l-8 rounded-md rounded-l-none',
        'flex flex-col items-start',
        'border-primary-200 dark:border-primary-100 border-l-primary',
      ],
      icon: 'w-6 h-6 fill-current',
    },
  });
