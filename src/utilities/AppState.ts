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

const List = [
  {
    id: 'AA',
    title: 'Today Tasks',
    lastModified: '2023-02-12',
    theme: 'green',
    tasks: [
      {
        id: 'AA1',
        title: 'Brush teeth',
        note: 'Brush my teet',
        date: '2023-02-13',
        complete: false,
      },
      {
        id: 'AA2',
        title: 'Brush teeth',
        note: 'Brush my teet',
        date: '2023-02-13',
        complete: false,
      },
      {
        id: 'AA3',
        title: 'Brush teeth',
        note: 'Brush my teet',
        date: '2023-02-13',
        complete: true,
      },
    ],
  },
  {
    id: 'AB',
    title: 'Today Tasks',
    lastModified: '2023-02-12',
    theme: 'blue',
    tasks: [],
  },
];

export const initialState = {
  list: List || [],
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
