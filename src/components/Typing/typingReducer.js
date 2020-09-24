import textList from '../../../textList.json';

function reducer(state, action) {
  switch (action.type) {
    case 'type':
      const {newIndex, newObj, progress} = action.payload;
      console.log('progress', progress);
      return {
        ...state,
        wordIndex: newIndex,
        updatedArrayWords: newObj,
        progress,
      };
    case 'mistake':
      return {...state, totalMistake: state.totalMistake + 1};
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
        ...state,
        sentence: textList[Math.floor(Math.random() * textList.length)].text,
        wordIndex: 0,
        progress: 0,
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
  sentence: textList[Math.floor(Math.random() * textList.length)].text,
};

export {reducer, initialState};
