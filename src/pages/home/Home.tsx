import { useReducer } from 'react';
import HomeSplash from '../../components/home-splash/HomeSplash';
import { initialState, reducer } from '../../utilities/AppState';
import './Home.scss';
import HomeList from '../../components/home-list/HomeList';

const Home: React.FC<{}> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {}, []);

  //   console.log(state);
  return (
    <>
      {state.list.length > 0 ? (
        <HomeList state={state} dispatch={dispatch} />
      ) : (
        <HomeSplash />
      )}
    </>
  );
};

export default Home;
