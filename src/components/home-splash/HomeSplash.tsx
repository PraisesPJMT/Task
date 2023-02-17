import './HomeSplash.scss';

interface HomeSplashProps {
  setOpen: () => void;
}

const HomeSplash: React.FC<HomeSplashProps> = ({ setOpen }) => {
  return (
    <section id="splash">
      <div>
        <h1>T@sk</h1>
        <p>
          Organize your activities with <span>T@sk</span>
        </p>
      </div>
      <div>
        <p>Start by creating a new list of tasks</p>
        <button type="button" onClick={() => setOpen()}>
          +
        </button>
      </div>
    </section>
  );
};

export default HomeSplash;
