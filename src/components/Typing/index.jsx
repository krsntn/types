import React, { useState, useEffect, useCallback, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import css from './typing.module.scss';
import DisplayText from '@components/DisplayText';
import PopUp from '@components/PopUp';
import { DataContext } from '@contexts/DataContext';
import textList from '../../../textList.json';

const Typing = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const [startTime, setStartTime] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [arrayWords, setArrayWords] = useState();
  const [totalWrong, setTotalWrong] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [words, setWords] = useState(
    textList[Math.floor(Math.random() * textList.length)].text
  );

  useEffect(() => {
    let newIndex = wordIndex;
    const handleKeyUp = (event) => {
      // 32 is space, 8 is backspace
      if (event.keyCode === 32 || event.keyCode === 8) {
        const textAreaValues = event.target.value.split(' ');
        newIndex = textAreaValues.length - 1;
      }

      const inputValue = event.target.value.split(' ')[newIndex];
      const toFollowValue = arrayWords[newIndex].text;
      const newObj = [...arrayWords];

      newObj[newIndex].error =
        inputValue && !toFollowValue.startsWith(inputValue);
      newObj[newIndex].passed = inputValue && toFollowValue === inputValue;

      if (event.keyCode !== 8) {
        if (newObj[newIndex].error) {
          setTotalWrong(totalWrong + 1);
        } else {
          setTotalCorrect(totalCorrect + 1);
        }
      }

      if (newIndex === arrayWords.length - 1) {
        if (newObj[newIndex].passed) {
          dispatch({
            type: 'finishTest',
            payload: {
              startTime,
              endTime: performance.now(),
              totalEntries: words.length,
              totalWrong,
              totalCorrect,
            },
          });
        }
      }

      setWordIndex(newIndex);
      setArrayWords(newObj);
    };

    const handleKeyDown = (event) => {
      if (event.keyCode === 32) {
        const textAreaValues = event.target.value.split(' ');
        newIndex = textAreaValues.length - 1;
        if (
          textAreaValues[newIndex] === '' ||
          textAreaValues[newIndex] !== arrayWords[newIndex].text
        ) {
          // double spaces
          return event.preventDefault();
        }
      }

      if (!state.testStart) {
        setStartTime(performance.now());
        dispatch({ type: 'startTest' });
      }
    };

    const textarea = document.querySelector('textarea');
    textarea.addEventListener('keyup', handleKeyUp);
    textarea.addEventListener('keydown', handleKeyDown);

    return () => {
      textarea.removeEventListener('keyup', handleKeyUp);
      textarea.removeEventListener('keydown', handleKeyDown);
    };
  }, [startTime, totalWrong, totalCorrect, wordIndex, arrayWords]);

  useEffect(() => {
    if (words) {
      const arrWords = words.split(' ');
      const obj = [];
      arrWords.map((word) =>
        obj.push({ text: word, error: false, passed: false })
      );
      setArrayWords(obj);
    }
  }, [words]);

  const closePopUp = useCallback(() => {
    dispatch({ type: 'closePopUp' });
    const redoButton = document.querySelector(`.${css.redo_button}`);
    console.log('tests');
    redoButton.focus();
  }, []);

  const handleRedo = useCallback(() => {
    dispatch({ type: 'redo' });
    setWordIndex(0);
    textList[Math.floor(Math.random() * textList.length)].text;
    setWords(textList[Math.floor(Math.random() * textList.length)].text);
    setTimeout(() => {
      const textarea = document.querySelector('textarea');
      textarea.value = '';
      textarea.focus();
    }, 50);
  }, []);

  return (
    <div className={css.container}>
      <div>
        <DisplayText arrayWords={arrayWords} index={wordIndex} />
      </div>
      <form className={css.form}>
        <textarea
          rows="6"
          className={css.textarea}
          disabled={state.testEnd}
        ></textarea>
        <button type="button" className={css.redo_button} onClick={handleRedo}>
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </form>
      {state.showPopUp && <PopUp onClose={closePopUp} />}
    </div>
  );
};

export default React.memo(Typing);
