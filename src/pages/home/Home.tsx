import { useReducer, useState } from 'react';
import { initialState, reducer } from '../../utilities/AppState';
import HomeSplash from '../../components/home-splash/HomeSplash';
import HomeList from '../../components/home-list/HomeList';
import AddListDialog from '../../components/add-list-dialogue/AddListDialog';
import './Home.scss';

const Home: React.FC<{}> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openListDialog, setOpenListDialog] = useState(false);

  return (
    <main>
      {state.list.length > 0 ? (
        <HomeList
          state={state}
          dispatch={dispatch}
          addList={() => setOpenListDialog(true)}
        />
      ) : (
        <HomeSplash setOpen={() => setOpenListDialog(true)} />
      )}
      <AddListDialog
        state={state}
        dispatch={dispatch}
        isOpen={openListDialog}
        setOpen={() => setOpenListDialog(false)}
      />
    </main>
  );
};

export default Home;
