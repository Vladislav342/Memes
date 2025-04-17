import { DOMAttributes } from '@react-types/shared';

export interface IPropsData {
  typeModal: string;
  isOpen: boolean;
  onOpenChange: () => void;
  moveProps: DOMAttributes;
  setRemove: (param: boolean) => void;
  setEdit: (param: boolean) => void;
  setCreate: (param: boolean) => void;
  changeName: string;
  setChangeName: (param: string) => void;
  changeLink: string;
  setChangeLink: (param: string) => void;
  correctLink: boolean;
  setCorrectLink: (param: boolean) => void;
  correctTextarea: boolean;
  setCorrectTextarea: (param: boolean) => void;
}
