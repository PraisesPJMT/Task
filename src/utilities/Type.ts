export interface TaskType {
  id: string;
  title: string;
  note: string;
  date: string;
  complete: boolean;
}

export interface ListType {
  id: string | undefined;
  title: string;
  lastModified: Date;
  theme: string;
  tasks: TaskType[];
}

export interface AppState {
  list: ListType[];
  errors: {}[];
}

export interface ListError {
  title: string;
  theme: string;
}
