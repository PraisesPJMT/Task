export interface TaskType {
  id: string;
  title: string;
  note: string;
  date: string | Date;
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
  listEdit: ListType;
}

export interface ListError {
  title: string;
  theme: string;
}
