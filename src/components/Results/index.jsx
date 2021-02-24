import React, {useContext} from 'react';
import {DataContext} from '@contexts/DataContext';
import css from './results.module.scss';

const Results = (props) => {
  const {
    state: {lastRoundWPM, averageWPM, fastestWPM},
  } = useContext(DataContext);
  const {isSentence, onTestModeToggle} = props;

  return (
    <div className={css.wrapper}>
      <button className={css.button} onClick={onTestModeToggle}>
        {isSentence ? 'sentence' : 'paragraph'}
      </button>
      <div className={css.container}>
        <div>
          <div className={css.tooltip}>
            {lastRoundWPM}
            <span className={css.tooltip_text}>last round wpm</span>
          </div>
        </div>
        <span>/</span>
        <div>
          <div className={css.tooltip}>
            {averageWPM}
            <span className={css.tooltip_text}>average wpm</span>
          </div>
        </div>
        <span>/</span>
        <div>
          <div className={css.tooltip}>
            {fastestWPM}
            <span className={css.tooltip_text}>fastest wpm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Results);
