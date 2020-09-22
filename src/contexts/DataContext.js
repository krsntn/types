import React, { createContext, useReducer } from 'react';
import { calcGrossWPM, calcNetWPM, calcAcc } from '@utils/calcSpeed';

const reducer = (state, action) => {
  switch (action.type) {
    case 'startTest':
      return { ...state, testStart: true };
    case 'finishTest':
      const newData = action.payload;
      const grossWPM = calcGrossWPM({
        totalEntries: newData.totalEntries,
        startTime: newData.startTime,
        endTime: newData.endTime,
      });

      const netWPM = calcNetWPM({
        totalEntries: newData.totalEntries,
        totalWrong: newData.totalWrong,
        startTime: newData.startTime,
        endTime: newData.endTime,
      });

      const acc = calcAcc({
        grossWPM,
        netWPM,
      });

      const newFastestWPM =
        state.fastestWPM === '-' || grossWPM > state.fastestWPM
          ? grossWPM
          : state.fastestWPM;

      return {
        ...state,
        fastestWPM: newFastestWPM,
        lastRoundWPM: grossWPM,
        accuracy: acc,
        showPopUp: true,
        testEnd: true,
      };
    case 'redo':
      return { ...state, testStart: false, testEnd: false };
    case 'showPopUp':
      return { ...state, showPopUp: true };
    case 'closePopUp':
      return { ...state, showPopUp: false };
  }
};

const initialState = {
  totalRound: 0,
  lastRoundWPM: '-',
  averageWPM: '-',
  fastestWPM: '-',
  accuracy: '-',
  showPopUp: false,
  testStart: false,
  testEnd: false,
};

const DataProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DataContext.Provider>
  );
};

const DataContext = createContext(initialState);

export { DataContext, DataProvider };
