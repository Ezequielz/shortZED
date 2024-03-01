

export const addMonthDate = (date: Date, month: number) => {

    const dateFormat = new Date(date);

    // Agregar 1 mes
    dateFormat.setMonth(dateFormat.getMonth() + month);

    // Formatear la nueva fecha en el mismo formato
    const newMonthDate = dateFormat.toISOString();

    return newMonthDate;


}
