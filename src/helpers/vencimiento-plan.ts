

export function getVencimientoDelPlan(fechaInicial: Date): string {
    const fechaFinal = new Date(fechaInicial);
    fechaFinal.setDate(fechaInicial.getDate() + 30);

    // Formatea la fecha y devuelve el resultado
    const opciones: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return fechaFinal.toLocaleDateString('es-ES', opciones);
}