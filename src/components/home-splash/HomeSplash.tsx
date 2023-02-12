import './HomeSplash.scss';

const HomeSplash: React.FC<{}> = () => {
  return (
    <section id="splash">
      <div>
        <h1>T@sk</h1>
        <p>
          Organize your activities with <span>T@sk</span>
        </p>
      </div>
      <div>
        <p>Start by creating a new list</p>
        <button type="button">+</button>
      </div>
    </section>
  );
};

export default HomeSplash;
