import React, {useEffect, useCallback, useContext, useReducer} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRedo} from '@fortawesome/free-solid-svg-icons';
import css from './typing.module.scss';
import DisplayText from '@components/DisplayText';
import PopUp from '@components/PopUp';
import ProgressBar from '@components/ProgressBar';
import Results from '@components/Results';
import {DataContext} from '@contexts/DataContext';
import {reducer, initialState} from './typingReducer';

const Typing = (props) => {
  const [localState, localDispatch] = useReducer(reducer, initialState);
  const {state, dispatch} = useContext(DataContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!state.testStart) {
        if (event.keyCode === 32) {
          return event.preventDefault();
        }
      }
    };

    const textarea = document.querySelector('textarea');
    textarea.addEventListener('keydown', handleKeyDown);

    return () => {
      textarea.removeEventListener('keydown', handleKeyDown);
    };
  }, [localState]);

  useEffect(() => {
    if (localState.sentence) {
      const arrWords = localState.sentence.split(' ');
      const obj = [];
      arrWords.map((word) =>
        obj.push({text: word, error: false, passed: false})
      );
      localDispatch({
        type: 'newSentence',
        payload: {arrWords: obj},
      });
    }
  }, [localState.sentence]);

  const closePopUp = useCallback(() => {
    dispatch({type: 'closePopUp'});
    const redoButton = document.querySelector(`.${css.redo_button}`);
    redoButton.focus();
  }, []);

  const handleRedo = useCallback(() => {
    localDispatch({type: 'redo'});
    dispatch({type: 'redo'});
    setTimeout(() => {
      const textarea = document.querySelector('textarea');
      textarea.value = '';
      textarea.focus();
    }, 50);
  }, []);

  const onTextAreaChange = useCallback(
    (event) => {
      if (!state.testStart) {
        localDispatch({type: 'start'});
        dispatch({type: 'startTest'});
      }

      let newIndex = localState.wordIndex;
      const inputValue = event.target.value;
      const arrInputValue = event.target.value.split(' ');
      const toFollowValue = JSON.parse(JSON.stringify(localState.arrayWords));

      if (arrInputValue) {
        for (let i = 0; i < arrInputValue.length; i++) {
          newIndex = i;
          if (arrInputValue[i] === toFollowValue[i].text) {
            toFollowValue[i].passed = true;
            toFollowValue[i].error = false;
          } else if (
            !toFollowValue[i].text.startsWith(arrInputValue[i]) ||
            (i !== arrInputValue.length - 1 &&
              arrInputValue[i] !== toFollowValue[i].text)
          ) {
            if (!toFollowValue[i].error) localDispatch({type: 'mistake'});
            toFollowValue[i].passed = false;
            toFollowValue[i].error = true;
            break;
          } else {
            toFollowValue[i].error = false;
            toFollowValue[i].passed = false;
          }
        }
      }

      const progress = (newIndex / (toFollowValue.length - 1)) * 100;

      localDispatch({
        type: 'type',
        payload: {newIndex, newObj: toFollowValue, progress},
      });

      if (localState.sentence === inputValue) {
        dispatch({
          type: 'finishTest',
          payload: {
            startTime: localState.startTime,
            endTime: performance.now(),
            totalEntries: localState.sentence.length,
            totalMistake: localState.totalMistake,
          },
        });
      }
    },
    [localState]
  );

  return (
    <div>
      <Results />
      <ProgressBar started={state.testStart} progress={localState.progress} />
      <div className={css.container}>
        <div>
          <DisplayText
            updatedArrayWords={localState.updatedArrayWords}
            index={localState.wordIndex}
          />
        </div>
        <form className={css.form}>
          <textarea
            rows="4"
            className={css.textarea}
            disabled={state.testEnd}
            onPaste={(event) => event.preventDefault()}
            onChange={onTextAreaChange}></textarea>
          <button
            type="button"
            className={css.redo_button}
            onClick={handleRedo}>
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </form>
        {state.showPopUp && <PopUp onClose={closePopUp} />}
      </div>
    </div>
  );
};

export default React.memo(Typing);
