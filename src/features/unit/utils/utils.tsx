import { kurdishNumberFormatter } from "@/lib/utils.tsx";

export function unitConversionDetailFormater(
  toSymbol: string,
  fromSymbol: string,
  rate: string,
) {
  const kurdishFormatedRate = kurdishNumberFormatter.format(parseInt(rate));
  return (
    <p>
      یەک دانە لە<strong> {toSymbol}</strong> پێکهاتوە لە
      <strong> {kurdishFormatedRate} </strong>دانە لە
      <strong> {fromSymbol} </strong>
    </p>
  );
}
