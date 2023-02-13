import { AppState, ListType } from './Type';

interface ListAction {
  type: 'ADD_LIST' | 'EDIT_LIST' | 'DELETE_LIST';
  payload: ListType;
}

interface ErrorAction {
  type:
    | 'SET_LIST_ERROR'
    | 'CLEAR_LIST_ERRORS'
    | 'SET_TASK_ERROR'
    | 'CLEAR_TASK_ERRORS';
  payload: {};
}

export type ActionType = ErrorAction | ListAction;

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

    default:
      return state;
  }
};
