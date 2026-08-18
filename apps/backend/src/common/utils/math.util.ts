export const roundToDecimal = (value: number | null | undefined, decimals = 1): number => {
  if (!value || Number.isNaN(value)) {
    return 0;
  }


  // return Math.round(value * 10) / 10;

  // toFixed(1) mengubah angka ke string dengan 1 desimal (contoh: "4.5"),
  // return Number(value.toFixed(1));

  // Hindari floating-point bug dengan eksponensial (MDN approach)
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
};
