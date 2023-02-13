import { AppState, ListType } from './Type';

interface ListAction {
  type: 'ADD_LIST' | 'EDIT_LIST';
  payload: ListType;
}

interface DeleteAction {
  type: 'DELETE_LIST';
  payload: string | undefined;
}

interface ErrorAction {
  type:
    | 'SET_LIST_ERROR'
    | 'CLEAR_LIST_ERRORS'
    | 'SET_TASK_ERROR'
    | 'CLEAR_TASK_ERRORS';
  payload: {};
}

export type ActionType = ErrorAction | ListAction | DeleteAction;

let storedList;

const storage = localStorage.getItem('tasks');

if (typeof storage === 'string') {
  storedList = JSON.parse(storage).list;
} else {
  storedList = [];
}

export const initialState = {
  list: storedList,
  errors: [],
};

export const reducer = (state: AppState, action: ActionType) => {
  switch (action.type) {
    case 'ADD_LIST':
      return { ...state, list: [...state.list, action.payload] };

    case 'DELETE_LIST':
      return {
        ...state,
        list: [...state.list.filter((item) => item.id !== action.payload)],
      };

    default:
      return state;
  }
};
