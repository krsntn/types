const calcGrossWPM = ({totalEntries, startTime, endTime}) => {
  return Math.floor(totalEntries / 5 / ((endTime - startTime) / 1000 / 60));
};

const calcNetWPM = ({totalEntries, totalMistake, startTime, endTime}) => {
  return Math.floor(
    (totalEntries / 5 - totalMistake / 5) / ((endTime - startTime) / 1000 / 60)
  );
};

const calcAcc = ({grossWPM, netWPM}) => {
  return Math.floor((netWPM / grossWPM) * 100);
};

const calcAveWPM = ({totalRound, averageWPM, lastRoundWPM}) => {
  return Math.floor(
    (averageWPM * (totalRound - 1) + lastRoundWPM) / totalRound
  );
};

export {calcGrossWPM, calcNetWPM, calcAcc, calcAveWPM};
