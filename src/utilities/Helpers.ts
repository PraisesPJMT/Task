import { DAYS, MONTHS } from './Data';
import { ListType } from './Type';

export const getTodaysDate = (input: Date | string) => {
  const date = new Date(input);
  let aft = 'th';

  if (date.getDate() % 10 === 1) aft = 'st';
  if (date.getDate() > 20 && date.getDate() % 10 === 2) aft = 'nd';
  if (date.getDate() > 20 && date.getDate() % 10 === 3) aft = 'rd';

  return {
    day: DAYS[date.getDay()],
    rest: `${date.getDate()}${aft} ${MONTHS[date.getMonth()]}`,
  };
};

export const getSummary = (list: ListType[]) => {
  const lists = list.length;
  let completed = 0;
  let tasks = 0;
  list.forEach((item) => {
    item.tasks.forEach((task) => {
      tasks++;
      if (task.complete === true) completed++;
    });
  });

  if (completed > 0)
    completed = Math.round((completed / tasks) * 100 * 10) / 10;

  return {
    lists,
    completed,
    tasks,
  };
};

export const getListId = (id: string | undefined) => {
  if (id === undefined) return 'AA';
  if (id.charCodeAt(1) < 90)
    return id.charAt(0) + String.fromCharCode(id.charCodeAt(1) + 1);
  return String.fromCharCode(id.charCodeAt(0) + 1) + 'A';
};
