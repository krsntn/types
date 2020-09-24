import React from 'react';
import css from './progressbar.module.scss';

const ProgressBar = ({started, progress}) => {
  return (
    <div className={css.wrapper}>
      <div className={css.bar} data-started={started}>
        <div className={css.loading} data-started={started}></div>
        <div className={css.progress} style={{width: `${progress}%`}}></div>
      </div>
    </div>
  );
};

export default React.memo(ProgressBar);
