import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ActionType } from '../../utilities/AppState';
import {
  getDateTime,
  getSummary,
  getTodaysDate,
} from '../../utilities/Helpers';
import { AppState, ListType } from '../../utilities/Type';
import ProgressBar from '../progress-bar/ProgressBar';
import LOGO from '../../assets/task.png';
import './HomeList.scss';

interface HomeListProps {
  addList: () => void;
  editList: () => void;
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
}

const HomeList: React.FC<HomeListProps> = ({
  addList,
  editList,
  state,
  dispatch,
}) => {
  const navigate = useNavigate();
  const { lists, completed, tasks } = getSummary(state.list);
  const { day, rest } = getTodaysDate(new Date());

  const handleEdit = (list: ListType) => {
    dispatch({ type: 'SET_EDIT_LIST', payload: list });
    editList();
  };

  return (
    <section id="home">
      <section>
        <h1>
          <img src={LOGO} alt="T@sk Logo" />
          T@sk
        </h1>
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
        {state.list.map((item, index) => (
          <div key={item.id} onClick={() => navigate(`/list/${item.id}`)}>
            <div>{index + 1}</div>
            <div>
              <div>
                <p>Created: {getDateTime(new Date(item.lastModified))}</p>
                <h3>{item.title}</h3>
                <p>{item.tasks.length} tasks</p>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={() => handleEdit(item)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: 'DELETE_LIST', payload: item.id })
                  }
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
            <div style={{ background: `${item.theme}` }} />
          </div>
        ))}
        <button type="button" onClick={() => addList()}>
          +
        </button>
      </section>
    </section>
  );
};

export default HomeList;
