import React, { useEffect, useState } from 'react';
import { ActionType } from '../../utilities/AppState';
import { initialTaskError } from '../../utilities/Data';
import {
  getListId,
  getNewTaskId,
  getTheme,
  getTodaysDate,
} from '../../utilities/Helpers';
import { AppState, ListType } from '../../utilities/Type';
import DatePicker from '../date-picker/DatePicker';
import './AddTaskDialog.scss';

interface AddTaskDialogProps {
  listTitle: string;
  listId: string | undefined;
  theme: string;
  lastTaskId: string | undefined;
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
  isOpen: boolean;
  setOpen: () => void;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  listTitle,
  listId,
  theme,
  lastTaskId,
  dispatch,
  isOpen,
  setOpen,
}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  // Date & Time
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [date, setDate] = useState(new Date().getDate());
  const [time, setTime] = useState('12:30');

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
      const newTask = {
        id: getNewTaskId(listId, lastTaskId),
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

      setError(initialTaskError);
      setDesc('');
      setTitle('');
      setYear(new Date().getFullYear());
      setMonth(new Date().getMonth());
      setDate(new Date().getDate());
      setTime('12:30');

      dispatch({
        type: 'ADD_TASK',
        payload: { listId: listId, task: newTask },
      });

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

  return isOpen ? (
    <section id="add-task-dialog">
      <div>
        <button type="button" onClick={() => setOpen()}>
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
          <button type="submit">ADD TASK</button>
        </form>
      </div>
    </section>
  ) : null;
};

export default AddTaskDialog;
