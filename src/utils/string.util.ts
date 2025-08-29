export const splitCamelCase = (str = "") => {
  return str?.replace(/([a-z])([A-Z0-9])/g, "$1 $2");
};

export const capitalizeFirstLetter = (str = "") => {
  const strArr = str.split(" ");
  if (strArr.length > 1) {
    return strArr.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const snakeToCamel = (str = "") => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

export const snakeToPascal = (str = "") => {
  const camelCase = snakeToCamel(str);
  const pascalCase = capitalizeFirstLetter(camelCase);
  return pascalCase;
};

export const snakeToSplittedLowerCase = (str = "") => {
  return splitCamelCase(snakeToCamel(str))?.toLowerCase();
};

export const formatToNPR = (
  val: number | string,
  options: Intl.NumberFormatOptions = {},
) => {
  let numberValue: number;
  try {
    numberValue = typeof val === "string" ? parseFloat(val) : val;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      ...options,
    }).format(numberValue);
  } catch (e) {
    return val;
  }
};

export const formatToPercentage = (
  val: number | string,
  options: Intl.NumberFormatOptions = {},
) => {
  let numberValue: number;
  try {
    numberValue = typeof val === "string" ? parseFloat(val) : val;
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    }).format(numberValue / 100);
  } catch (e) {
    return val;
  }
};

export const formatNumberToAbbreviation = (num: number) => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
};

export const pluralize = <
  C extends number,
  N extends string,
  P extends string = `${N}s`,
>(
  count: C,
  noun: N,
  plural?: P,
): C extends 1 ? N : P => {
  return (count === 1 ? noun : plural || `${noun}s`) as C extends 1 ? N : P;
};
