import { DAYS, MONTHS } from './Data';
import { ListType } from './Type';

export const getTodaysDate = () => {
  const today = new Date();
  let aft = 'th';

  if (today.getDate() % 10 === 1) aft = 'st';
  if (today.getDate() > 20 && today.getDate() % 10 === 2) aft = 'nd';
  if (today.getDate() > 20 && today.getDate() % 10 === 3) aft = 'rd';

  return {
    day: DAYS[today.getDay()],
    rest: `${today.getDate()}${aft} ${MONTHS[today.getMonth()]}`,
  };
  // Wednesday 20th March
};

export const getSummary = (list: ListType[]) => {
  const lists = list.length;
  let completed = 0;
  let tasks = 0;
  list.forEach((item) => {
    item.tasks.forEach((task) => {
      tasks++;
      if (task.complete) completed++;
    });
  });

  // console.log({ lists, completed: (completed / tasks) * 100, tasks });
  return {
    lists,
    completed: Math.round((completed / tasks) * 100 * 10) / 10,
    tasks,
  };
};
