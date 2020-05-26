import { extendCodec } from "./utils";
import { Codec, Left, number, Right } from "purify-ts/es";

export type NumberRangeOption = {
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
};

export const NumberRangedIn = ({ gt, gte, lt, lte }: NumberRangeOption) =>
  extendCodec<number>(number, (value) => {
    if (gt != null && !(gt < value))
      return Left(`number must be greater than ${gt}`);
    if (gte != null && !(gte <= value))
      return Left(`number must be greater than equal ${gte}`);
    if (lt != null && !(lt > value))
      return Left(`number must be less than ${lt}`);
    if (lte != null && !(lte >= value))
      return Left(`number must be less than equal ${lte}`);
    return Right(value);
  });

export const NumberFromString = Codec.custom<number>({
  decode: (value) => {
    const num = Number(value);
    if (Number.isNaN(num)) return Left("value is not number parsable string");
    if (!Number.isFinite(num)) return Left("value is not finite number");
    return Right(num);
  },
  encode: (value) => `${value}`,
});