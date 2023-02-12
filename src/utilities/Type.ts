export interface TaskType {
  id: string;
  title: string;
  note: string;
  date: string;
  complete: boolean;
}

export interface ListType {
  id: string;
  title: string;
  lastModified: string;
  theme: string;
  tasks: TaskType[];
}

export interface AppState {
  list: ListType[];
  errors: {}[];
}
