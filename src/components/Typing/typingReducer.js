import {paragraph} from 'txtgen/dist/txtgen.min';

function reducer(state, action) {
  switch (action.type) {
    case 'type':
      const {newIndex, newObj, progress} = action.payload;
      return {
        ...state,
        wordIndex: newIndex,
        updatedArrayWords: newObj,
        progress,
        hitMistake: newObj.some((word) => word.error),
      };
    case 'mistake':
      if (state.hitMistake) {
        return {...state};
      } else {
        return {
          ...state,
          totalMistake: state.totalMistake + 1,
          hitMistake: true,
        };
      }
    case 'start':
      return {...state, startTime: performance.now()};
    case 'newSentence':
      const {arrWords} = action.payload;
      return {
        ...state,
        arrayWords: arrWords,
        updatedArrayWords: arrWords,
      };
    case 'redo':
      return {
        ...initialState,
        sentence: paragraph(),
      };
    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
}

const initialState = {
  progress: 0,
  startTime: null,
  wordIndex: 0,
  arrayWords: null,
  updatedArrayWords: null,
  totalMistake: 0,
  hitMistake: false,
  sentence: paragraph(),
};

export {reducer, initialState};
