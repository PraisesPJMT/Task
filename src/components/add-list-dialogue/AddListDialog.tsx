import React, { useEffect, useState } from 'react';
import { ActionType } from '../../utilities/AppState';
import { initialError, THEMES } from '../../utilities/Data';
import { getListId, getTodaysDate } from '../../utilities/Helpers';
import { AppState } from '../../utilities/Type';
import './AddListDialog.scss';

interface AddListDialogProps {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
  isOpen: boolean;
  setOpen: () => void;
}

const AddListDialog: React.FC<AddListDialogProps> = ({
  state,
  dispatch,
  isOpen,
  setOpen,
}) => {
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [error, setError] = useState(initialError);
  const { day, rest } = getTodaysDate(new Date());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.length < 1)
      setError((prev) => ({ ...prev, title: 'Task must have a title' }));
    if (title.length < 4)
      setError((prev) => ({
        ...prev,
        title: 'Task tile must have more than 3 characters',
      }));
    if (theme.length < 1)
      setError((prev) => ({ ...prev, theme: 'Select a theme for the list' }));
    if (theme.length > 3 && title.length > 3) {
      const newList = {
        id: getListId(state.list.at(-1)?.id),
        title,
        theme,
        lastModified: new Date(),
        tasks: [],
      };

      setError(initialError);
      setTheme('');
      setTitle('');

      dispatch({ type: 'ADD_LIST', payload: newList });

      setOpen();
    }
  };

  const handleTitle = (title: string) => {
    setError(initialError);
    setTitle(title);
  };

  const handleTheme = (theme: string) => {
    setError(initialError);
    setTheme(theme);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state));
  }, [state.list.length]);

  return isOpen ? (
    <section id="add-list-dialog">
      <div>
        <button type="button" onClick={() => setOpen()}>
          +
        </button>
        <div>
          <h1>New List</h1>
          <p>
            <span>{day} </span>
            <span>{rest}</span>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="title">
                Title
                <br />
                {error.title.length > 0 ? (
                  <p className="error-message">{error.title}</p>
                ) : null}
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="New List"
                  value={title}
                  onChange={(e) => handleTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                Theme
                <br />
              </label>
              {error.theme.length > 0 ? (
                <p className="error-message">{error.theme}</p>
              ) : null}
              <div>
                {THEMES.map((theme) => (
                  <React.Fragment key={theme}>
                    <input
                      type="radio"
                      id={theme}
                      name="theme"
                      value={theme}
                      onChange={(e) => handleTheme(e.target.value)}
                    />
                    <label
                      htmlFor={theme}
                      style={{
                        backgroundColor: theme,
                      }}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <button type="submit">ADD LIST</button>
        </form>
      </div>
    </section>
  ) : null;
};

export default AddListDialog;
