import { AppState, ListType } from './Type';

interface ListAction {
  type: 'ADD_LIST' | 'EDIT_LIST' | 'SET_EDIT_LIST';
  payload: ListType;
}

interface DeleteAction {
  type: 'DELETE_LIST';
  payload: string | undefined;
}

interface ClearEditListActions {
  type: 'CLEAR_EDIT_LIST';
}

export type ActionType = ListAction | DeleteAction | ClearEditListActions;

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

    default:
      return state;
  }
};
