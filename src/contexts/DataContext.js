import React, {createContext, useReducer} from 'react';
import {calcGrossWPM, calcNetWPM, calcAcc, calcAveWPM} from '@utils/calcSpeed';

const reducer = (state, action) => {
  switch (action.type) {
    case 'startTest':
      return {...state, testStart: true};
    case 'finishTest':
      const newData = action.payload;
      const grossWPM = calcGrossWPM({
        totalEntries: newData.totalEntries,
        startTime: newData.startTime,
        endTime: newData.endTime,
      });

      const netWPM = calcNetWPM({
        totalEntries: newData.totalEntries,
        totalMistake: newData.totalMistake,
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

      const newUserData = {
        totalRound: state.totalRound + 1,
        lastRoundWPM: grossWPM,
        averageWPM: calcAveWPM({
          totalRound: state.totalRound + 1,
          averageWPM: state.averageWPM === '-' ? 0 : state.averageWPM,
          lastRoundWPM: grossWPM,
        }),
        fastestWPM: newFastestWPM,
      };

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('userData', JSON.stringify(newUserData));
      }

      return {
        ...state,
        ...newUserData,
        accuracy: acc,
        showPopUp: true,
        testEnd: true,
      };
    case 'redo':
      return {...state, testStart: false, testEnd: false};
    case 'showPopUp':
      return {...state, showPopUp: true};
    case 'closePopUp':
      return {...state, showPopUp: false};
  }
};

const initialState = () => {
  const initialValue = {
    totalRound: 0,
    lastRoundWPM: '-',
    averageWPM: '-',
    fastestWPM: '-',
    accuracy: '-',
    showPopUp: false,
    testStart: false,
    testEnd: false,
  };

  if (typeof window !== 'undefined') {
    let userData = window.sessionStorage.getItem('userData');
    if (userData) {
      userData = JSON.parse(userData);
      initialValue.totalRound = userData.totalRound;
      initialValue.lastRoundWPM = userData.lastRoundWPM;
      initialValue.averageWPM = userData.averageWPM;
      initialValue.fastestWPM = userData.fastestWPM;
    }
  }

  return initialValue;
};

const DataProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  return (
    <DataContext.Provider value={{state, dispatch}}>
      {props.children}
    </DataContext.Provider>
  );
};

const DataContext = createContext();

export {DataContext, DataProvider};
