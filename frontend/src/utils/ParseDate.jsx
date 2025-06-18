export function parseDate(str) {
    const [day, monthFr] = str.split(' ');
    const months = ["Jan.", "Fév.", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Sept.", "Oct.", "Nov.", "Déc."]
    const monthIndex = months.findIndex(m => m.toLowerCase().startsWith(monthFr.toLowerCase()));
    const now = new Date();

    let year = now.getFullYear();
    if (monthIndex > now.getMonth()) year -= 1;
    return new Date(year, monthIndex, parseInt(day, 10));
}