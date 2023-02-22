import { AppState, ListType, TaskType } from './Type';

interface ListAction {
  type: 'ADD_LIST' | 'EDIT_LIST' | 'SET_EDIT_LIST';
  payload: ListType;
}

interface TaskAction {
  type: 'ADD_TASK' | 'EDIT_TASK' | 'SET_EDIT_TASK';
  payload: { listId: string | undefined; task: TaskType };
}

interface CompleteTaskAction {
  type: 'COMPLETE_TASK';
  payload: { listId: string | undefined; taskId: string | undefined };
}

interface DeleteAction {
  type: 'DELETE_LIST';
  payload: string | undefined;
}

interface ClearEditListActions {
  type: 'CLEAR_EDIT_LIST';
}

export type ActionType =
  | ListAction
  | DeleteAction
  | ClearEditListActions
  | TaskAction
  | CompleteTaskAction;

let storedList;

const storage = localStorage.getItem('tasks');

if (typeof storage === 'string') {
  storedList = JSON.parse(storage).list;
} else {
  storedList = [];
}

export const initialEditState = {
  id: '',
  title: '',
  lastModified: new Date(),
  theme: '',
  tasks: [],
};

export const initialState = {
  list: storedList,
  listEdit: initialEditState,
};

export const reducer = (state: AppState, action: ActionType) => {
  switch (action.type) {
    // List Actions
    case 'ADD_LIST':
      return { ...state, list: [...state.list, action.payload] };

    case 'DELETE_LIST':
      return {
        ...state,
        list: [...state.list.filter((item) => item.id !== action.payload)],
      };

    case 'SET_EDIT_LIST':
      return { ...state, listEdit: action.payload };

    case 'CLEAR_EDIT_LIST':
      return { ...state, listEdit: initialEditState };

    case 'EDIT_LIST':
      return {
        ...state,
        list: [
          ...state.list.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        ],
      };

    // Task Actions
    case 'ADD_TASK':
      return {
        ...state,
        list: [
          ...state.list.map((list) =>
            list.id === action.payload.listId
              ? { ...list, tasks: [...list.tasks, action.payload.task] }
              : list
          ),
        ],
      };

    case 'COMPLETE_TASK':
      return {
        ...state,
        list: [
          ...state.list.map((list) =>
            list.id === action.payload.listId
              ? {
                  ...list,
                  tasks: [
                    ...list.tasks.map((task) =>
                      task.id === action.payload.taskId
                        ? { ...task, complete: !task.complete }
                        : task
                    ),
                  ],
                }
              : list
          ),
        ],
      };

    default:
      return state;
  }
};
