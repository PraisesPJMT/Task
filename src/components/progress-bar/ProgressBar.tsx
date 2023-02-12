import './ProgressBar.scss';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div style={{ width: `${progress}%` }}>{progress}%</div>
    </div>
  );
};

export default ProgressBar;
