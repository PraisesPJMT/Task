import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionType } from '../../utilities/AppState';
import { getSummary, getTodaysDate } from '../../utilities/Helpers';
import { AppState } from '../../utilities/Type';
import ProgressBar from '../progress-bar/ProgressBar';
import './HomeList.scss';

interface HomeListProps {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
}

const HomeList: React.FC<HomeListProps> = ({ state, dispatch }) => {
  const { lists, completed, tasks } = getSummary(state.list);
  const { day, rest } = getTodaysDate();
  return (
    <section id="home">
      <section>
        <h1>T@sk</h1>
        <p>
          <span>{day} </span>
          <span>{rest}</span>
        </p>
      </section>
      <section>
        <div>
          <p>
            <span>Lists: </span>
            <span>{lists}</span>
          </p>
          <p>
            <span>Tasks: </span>
            <span>{tasks}</span>
          </p>
        </div>
        <div>
          <p>Completed Tasks</p>
          <ProgressBar progress={completed} />
        </div>
      </section>
      <section>
        {state.list.map((item) => (
          <div>
            <div>{/* <input type="checkbox" /> */}</div>
            <div>
              <div>
                <p>Edited: {item.lastModified}</p>
                <h3>{item.title}</h3>
                <p>{item.tasks.length} tasks</p>
              </div>
              <div>
                <button type="button">
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <span>Edit</span>
                </button>
                <button type="button">
                  <FontAwesomeIcon icon={faTrashCan} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
            <div style={{ background: `${item.theme}` }} />
          </div>
        ))}
        <button type="button">+</button>
      </section>
    </section>
  );
};

export default HomeList;