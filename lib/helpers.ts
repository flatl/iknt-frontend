export function humanizeDate(d: Date | string): string {
  const date = d instanceof Date ? d : new Date(d);
  
  const monthes = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',    
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];
  const addNullPrefix = (n: number) => n.toString().padStart(2, '0');

  return `${addNullPrefix(date.getDate())} ${monthes[date.getMonth()]} ${date.getFullYear()}`.toUpperCase();
}
