import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { DataContext } from '@contexts/DataContext';
import css from './popup.module.scss';

const PopUp = ({ onClose }) => {
  const { state, dispatch } = useContext(DataContext);

  useEffect(() => {
    const closePopUp = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener('keyup', closePopUp);
    return () => {
      document.removeEventListener('keyup', closePopUp);
    };
  }, []);

  return (
    <div className={css.popup}>
      <div className={css.wrapper}>
        <button type="button" className={css.close_button} onClick={onClose}>
          <FontAwesomeIcon
            icon={faTimesCircle}
            className={css.close_icon}
          ></FontAwesomeIcon>
        </button>
        <div>
          <div className={css.result_box}>
            <div className={css.result_text}>{state.lastRoundWPM}</div>
            <span className={css.label}>wpm</span>
          </div>
          <div className={css.result_box}>
            <div className={css.result_text}>{state.accuracy}%</div>
            <span className={css.label}>acc</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PopUp);
