import { useState } from 'react';
import { ActionType } from '../../utilities/AppState';
import HomeSplash from '../../components/home-splash/HomeSplash';
import HomeList from '../../components/home-list/HomeList';
import AddListDialog from '../../components/add-list-dialogue/AddListDialog';
import './Home.scss';
import EditListDialog from '../../components/edit-list-dialogue/EditListDialog';
import { AppState } from '../../utilities/Type';

interface HomeProps {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
}

const Home: React.FC<HomeProps> = ({ state, dispatch }) => {
  const [openListDialog, setOpenListDialog] = useState(false);
  const [openListEditDialog, setOpenListEditDialog] = useState(false);

  return (
    <main>
      {state.list.length > 0 ? (
        <HomeList
          state={state}
          dispatch={dispatch}
          addList={() => setOpenListDialog(true)}
          editList={() => setOpenListEditDialog(true)}
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
      <EditListDialog
        state={state}
        dispatch={dispatch}
        isOpen={openListEditDialog}
        setOpen={() => setOpenListEditDialog(false)}
      />
    </main>
  );
};

export default Home;
