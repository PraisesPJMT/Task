import React, { useEffect, useState } from 'react';
import { ActionType } from '../../utilities/AppState';
import { initialError, THEMES } from '../../utilities/Data';
import { getListId, getTodaysDate } from '../../utilities/Helpers';
import { AppState } from '../../utilities/Type';
import './EditListDialogue.scss';

interface EditListDialogProps {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
  isOpen: boolean;
  setOpen: () => void;
}

const EditListDialog: React.FC<EditListDialogProps> = ({
  state,
  dispatch,
  isOpen,
  setOpen,
}) => {
  const [title, setTitle] = useState(state.listEdit.title);
  const [theme, setTheme] = useState(state.listEdit.theme);
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
      const editedList = {
        id: state.listEdit.id,
        title,
        theme,
        lastModified: new Date(),
        tasks: state.listEdit.tasks,
      };

      setError(initialError);

      dispatch({ type: 'EDIT_LIST', payload: editedList });
      dispatch({ type: 'CLEAR_EDIT_LIST' });

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
    setTitle(state.listEdit.title);
    setTheme(state.listEdit.theme);
    if (state.listEdit.title.length < 1)
      localStorage.setItem('tasks', JSON.stringify(state));
  }, [state.listEdit.title, state.listEdit.theme]);

  return isOpen ? (
    <section id="edit-list-dialog">
      <div>
        <button type="button" onClick={() => setOpen()}>
          +
        </button>
        <div>
          <h1>Edit List</h1>
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
                {THEMES.map((them) => (
                  <React.Fragment key={them}>
                    <input
                      type="radio"
                      id={them}
                      name="theme"
                      value={them}
                      checked={them === theme ? true : false}
                      onChange={(e) => handleTheme(e.target.value)}
                    />
                    <label
                      htmlFor={them}
                      style={{
                        backgroundColor: them,
                      }}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <button type="submit">SAVE LIST</button>
        </form>
      </div>
    </section>
  ) : null;
};

export default EditListDialog;
