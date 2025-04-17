import Joi from 'joi';
import { IMemDataDto } from '@/types/MemDataDto';

const memValidation = (data: IMemDataDto) => {
  const memSchema = Joi.object<IMemDataDto>({
    name: Joi.string().required(),
    date: Joi.string().required(),
    link: Joi.string().required(),
    likes: Joi.number().required(),
  });
  return memSchema.validate(data);
};

export default memValidation;
