import { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import { initialState, reducer } from './utilities/AppState';
import './App.scss';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Routes>
      <Route path="/" element={<Home state={state} dispatch={dispatch} />} />
      <Route
        path="/list/:listId"
        element={<List state={state} dispatch={dispatch} />}
      />
    </Routes>
  );
}

export default App;
