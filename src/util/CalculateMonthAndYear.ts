export const calcMonthYear = (type: string, month: number, year: number) => {
    type === "dec" ? month-- : month++;
    if (month < 0) {
        month = month + 12;
        year--;
    }
    else if (month > 11) {
        month = month - 12;
        year++;
    }
    return { month, year };
}