import { useEffect, useState } from 'react';
import { ActionType } from '../../utilities/AppState';
import { initialTaskError } from '../../utilities/Data';
import { getTheme, getTodaysDate } from '../../utilities/Helpers';
import { AppState } from '../../utilities/Type';
import DatePicker from '../date-picker/DatePicker';
import './EditTaskDialog.scss';

interface EditTaskDialogProps {
  listId: string | undefined;
  listTitle: string;
  theme: string;
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
  isOpen: boolean;
  setOpen: () => void;
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  listId,
  listTitle,
  theme,
  state,
  dispatch,
  isOpen,
  setOpen,
}) => {
  const [title, setTitle] = useState(state.taskEdit.title);
  const [desc, setDesc] = useState(state.taskEdit.note);

  // Date & Time
  const [year, setYear] = useState(new Date(state.taskEdit.date).getFullYear());
  const [month, setMonth] = useState(new Date(state.taskEdit.date).getMonth());
  const [date, setDate] = useState(new Date(state.taskEdit.date).getDate());
  const [time, setTime] = useState(
    `${new Date(state.taskEdit.date).getHours()}:${new Date(
      state.taskEdit.date
    ).getMinutes()}`
  );

  const [error, setError] = useState(initialTaskError);
  const { day, rest } = getTodaysDate(new Date(year, month, date));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.length < 1)
      setError((prev) => ({ ...prev, title: 'Task must have a title' }));
    if (title.length < 4)
      setError((prev) => ({
        ...prev,
        title: 'Task title must have more than 3 characters',
      }));
    if (title.length > 3) {
      const editedTask = {
        id: state.taskEdit.id,
        title,
        note: desc,
        date: new Date(
          year,
          month,
          date,
          Number(time.toString().slice(0, 2)),
          Number(time.toString().slice(3))
        ),
        complete: false,
      };

      dispatch({
        type: 'EDIT_TASK',
        payload: { listId: listId, task: editedTask },
      });
      dispatch({ type: 'CLEAR_EDIT_TASK' });

      setOpen();
    }
  };

  const handleTitle = (title: string) => {
    setError(initialTaskError);
    setTitle(title);
  };

  const handleDesc = (theme: string) => {
    setError(initialTaskError);
    setDesc(theme);
  };

  const handleClose = () => {
    setOpen();
    dispatch({ type: 'CLEAR_EDIT_TASK' });
  };

  useEffect(() => {
    setTitle(state.taskEdit.title);
    setDesc(state.taskEdit.note);
    setYear(new Date(state.taskEdit.date).getFullYear());
    setMonth(new Date(state.taskEdit.date).getMonth());
    setDate(new Date(state.taskEdit.date).getDate());
    setTime(
      `${new Date(state.taskEdit.date).getHours()}:${new Date(
        state.taskEdit.date
      ).getMinutes()}`
    );
  }, [state]);

  return isOpen ? (
    <section id="edit-task-dialog">
      <div>
        <button type="button" onClick={() => handleClose()}>
          +
        </button>
        <div>
          <h2>{listTitle}</h2>
          <p>
            <span>{day} </span>
            <span>{rest}</span>
          </p>
        </div>
        <DatePicker
          year={year}
          month={month}
          date={date}
          setYear={setYear}
          setMonth={setMonth}
          setDate={setDate}
        />
        <form onSubmit={handleSubmit}>
          <div
            className="display-box"
            style={{ background: theme, color: getTheme(theme) }}
          >
            <span />
          </div>
          <div>
            <div>
              <label
                htmlFor="title"
                className={`title ${title.length < 4 ? 'invalid' : 'valid'}`}
              >
                Task <span className="validation"></span>
                <span
                  className="display-circle"
                  style={{ border: `4px solid ${theme}` }}
                />
                <br />
                {error.title.length > 0 ? (
                  <p className="error-message">{error.title}</p>
                ) : null}
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="New Task"
                  value={title}
                  onChange={(e) => handleTitle(e.target.value)}
                  required
                />
              </label>
              <label htmlFor="desc">
                Description
                <br />
                <textarea
                  id="desc"
                  name="desc"
                  placeholder="Task description"
                  value={desc}
                  onChange={(e) => handleDesc(e.target.value)}
                />
              </label>
              <label htmlFor="time">
                Time
                <br />
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>
          <button type="submit">SAVE TASK</button>
        </form>
      </div>
    </section>
  ) : null;
};

export default EditTaskDialog;
