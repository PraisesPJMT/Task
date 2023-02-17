import {
  faCheck,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ActionType } from '../../utilities/AppState';
import {
  getDays,
  getSummary,
  getTodaysDate,
  getDateTime,
  getStatus,
  getCompletedTasksCount,
  getList,
} from '../../utilities/Helpers';
import { AppState, ListType, TaskType } from '../../utilities/Type';
import './List.scss';

interface ListProps {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
}

const List: React.FC<ListProps> = ({ state, dispatch }) => {
  const { listId } = useParams();

  const list: ListType = getList(state.list, listId);
  const days = getDays();

  const { day, rest } = getTodaysDate(new Date());
  const [selection, setSelection] = useState<'ALL' | 'COMPLETED' | 'ACTIVE'>(
    'ALL'
  );

  const [tasks, setTasks] = useState<TaskType[]>(list.tasks);

  const updateSelection = () => {
    switch (selection) {
      case 'COMPLETED':
        setTasks(list.tasks.filter((task) => task.complete === true));
        break;

      case 'ACTIVE':
        setTasks(list.tasks.filter((task) => task.complete === false));
        break;

      default:
        setTasks(list.tasks);
        break;
    }
  };

  useEffect(() => {
    updateSelection();
  }, [selection]);

  return (
    <section id="list">
      <section>
        <section>
          <div>
            <p>
              <span>{day} </span>
              <span>{rest}</span>
            </p>
            <h1>{list.title}</h1>
          </div>
          <div>
            <p>
              <span>Tasks: </span>
              {list.tasks.length}
            </p>
            <p>
              <span>Completed: </span>
              {getCompletedTasksCount(list.tasks)}
            </p>
          </div>
        </section>
        <section>
          {days.map((day) => (
            <div key={day.day}>
              <p>{day.date}</p>
              <p>{day.day.slice(0, 3)}</p>
            </div>
          ))}
        </section>
      </section>
      <section>
        {tasks.length > 0 ? (
          <>
            <div className="task-nav">
              <button
                type="button"
                className={`${selection === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelection('ALL')}
              >
                All
              </button>
              <button
                type="button"
                className={`${selection === 'COMPLETED' ? 'active' : ''}`}
                onClick={() => setSelection('COMPLETED')}
              >
                Completed
              </button>
              <button
                type="button"
                className={`${selection === 'ACTIVE' ? 'active' : ''}`}
                onClick={() => setSelection('ACTIVE')}
              >
                Active
              </button>
            </div>
            <div className="tasks">
              {tasks.map((item) => (
                <div
                  key={item.id}
                  className={`task ${item.complete ? 'complete' : ''}`}
                >
                  <div>
                    <button type="button">
                      {item.complete ? (
                        <div style={{ background: list.theme }}>
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      ) : (
                        <div style={{ border: `4px solid ${list.theme}` }} />
                      )}
                    </button>
                  </div>
                  <div>
                    <div>
                      <p id={item.complete ? 'complete' : ''}>
                        {getStatus(new Date(item.date))}:{' '}
                        {getDateTime(new Date(item.date))}
                      </p>
                      <h3>{item.title}</h3>
                      <p>{item.note} tasks</p>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <button type="button" className="task-btn">
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <span>Edit</span>
                      </button>
                      <button className="task-btn" type="button">
                        <FontAwesomeIcon icon={faTrashCan} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                  <div style={{ background: `${list.theme}` }} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="list-splash">Start your list by creating a task</p>
        )}

        <button type="button">+</button>
      </section>
    </section>
  );
};

export default List;
