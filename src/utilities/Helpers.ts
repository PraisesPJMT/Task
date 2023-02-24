import { DAYS, MONTHS } from './Data';
import { ListType, TaskType } from './Type';

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

export const getNewTaskId = (
  listId: string | undefined,
  lastTskId: string | undefined
) => {
  if (!lastTskId) return `${listId}-001`;
  return `${listId}-${String(Number(lastTskId.slice(-3)) + 1).padStart(
    3,
    '0'
  )}`;
};

export const getDays = () => {
  const today = new Date();
  const day = today.getDay();
  const date = today.getDate();
  switch (day) {
    case 0:
      break;

    default:
      break;
  }
  return [
    {
      date: date - 2,
      day: DAYS[day - 2 < 0 ? DAYS.length + (day - 2) : day - 2],
    },
    {
      date: date - 1,
      day: DAYS[day - 1 < 0 ? DAYS.length + (day - 1) : day - 1],
    },
    { date: date, day: DAYS[day] },
    {
      date: date + 1,
      day: DAYS[
        day + 1 > 6
          ? DAYS.length - (day + 1 > DAYS.length ? DAYS.length : day + 1)
          : day + 1
      ],
    },
    {
      date: date + 2,
      day: DAYS[
        day + 2 > 6
          ? DAYS.length - (day + 2 > DAYS.length ? DAYS.length : day + 2)
          : day + 2
      ],
    },
    {
      date: date + 3,
      day: DAYS[
        day + 3 > 6
          ? DAYS.length - (day + 3 > DAYS.length ? day + 1 : day + 3)
          : day + 3
      ],
    },
  ];
};

export const getStatus = (date: Date) => {
  const today = new Date();

  if (date.getDay() === today.getDay()) return 'Created';
  return 'Edited';
};

export const getDateTime = (date: Date) => {
  const today = new Date();

  if (date.getDay() === today.getDay()) {
    let hr = date.getHours();
    let ap = 'AM';
    if (hr > 12) {
      hr = hr - 12;
      ap = 'PM';
    }
    if (hr === 24) hr = 0;
    return `${hr.toString().padStart(2, '0')}:${date.getMinutes()} ${ap}`;
  } else {
    let aft = 'th';

    if (date.getDate() % 10 === 1) aft = 'st';
    if (date.getDate() > 20 && date.getDate() % 10 === 2) aft = 'nd';
    if (date.getDate() > 20 && date.getDate() % 10 === 3) aft = 'rd';
    return `${DAYS[date.getDay()].slice(0, 3)}, ${date.getDate()}${aft} ${
      MONTHS[date.getMonth()]
    }`;
  }
};

export const getCompletedTasksCount = (tasks: TaskType[]) => {
  let comp = 0;
  tasks.forEach((task) => {
    if (task.complete) comp++;
  });
  return comp;
};

export const getList = (list: ListType[], listId: string | undefined) => {
  let id,
    title,
    theme = '';
  let lastModified = new Date();
  let tasks: TaskType[] = [];

  list.forEach((item) => {
    if (item.id === listId) {
      id = item.id;
      title = item.title;
      lastModified = item.lastModified;
      theme = item.theme;
      item.tasks.forEach((task) => tasks.push(task));
    }
  });

  return { id, title: title || '', theme, tasks, lastModified };
};

export const getTheme = (theme: string) => {
  const collections = [
    '#00539CFF',
    '#4831D4',
    // '#C5FAD5',
    '#F96167',
    // '#E2D1F9',
    '#317773',
    '#8AAAE5',
    '#FF69B4',
    // '#99F443',
    '#00FFFF',
    // '#FCE77D',
  ];

  if (collections.includes(theme)) return '#FFF';

  return '#161D43';
};
