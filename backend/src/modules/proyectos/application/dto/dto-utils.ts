import { TransformFnParams } from 'class-transformer';

export const trim = ({ value }: TransformFnParams) =>
  typeof value === 'string' ? value.trim() : value;

export const emptyToNull = ({ value }: TransformFnParams) => {
  const trimmed = typeof value === 'string' ? value.trim() : value;
  return trimmed === '' ? null : trimmed;
};

export const booleano = ({ value }: TransformFnParams) =>
  value === true || value === 'true' || value === '1' || value === 1
    ? true
    : value === false || value === 'false' || value === '0' || value === 0
      ? false
      : value;
