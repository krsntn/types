import React, { useContext } from 'react';
import { DataContext } from '@contexts/DataContext';
import css from './results.module.scss';

const Results = (props) => {
  const {
    state: { lastRoundWPM, averageWPM, fastestWPM },
  } = useContext(DataContext);

  return (
    <div className={css.container}>
      <table className={css.table}>
        <tbody>
          <tr>
            <td>fastest</td>
            <td>:</td>
            <td>
              {fastestWPM}
              {fastestWPM >= 0 ? 'wpm' : ''}
            </td>
          </tr>
          <tr>
            <td>average</td>
            <td>:</td>
            <td>
              {averageWPM}
              {averageWPM >= 0 ? 'wpm' : ''}
            </td>
          </tr>
          <tr>
            <td>last round</td>
            <td>:</td>
            <td>
              {lastRoundWPM}
              {lastRoundWPM >= 0 ? 'wpm' : ''}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Results);
