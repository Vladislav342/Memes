import { IMemDataDto } from './MemDataDto';

export interface IItem {
  item: IMemDataDto;
  key: string | undefined;
  setCurMem: (item: IMemDataDto) => void;
  setLike: (param: boolean) => void;
}
