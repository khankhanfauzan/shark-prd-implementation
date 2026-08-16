export const roundToDecimal = (value: number | null | undefined): number => {
    if (!value || Number.isNaN(value)) {
        return 0;
    }

    return Math.round(value * 10) / 10;
}