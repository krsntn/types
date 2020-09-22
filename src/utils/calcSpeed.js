const calcGrossWPM = ({ totalEntries, startTime, endTime }) => {
  return Math.floor(totalEntries / 5 / ((endTime - startTime) / 1000 / 60));
};

const calcNetWPM = ({ totalEntries, totalWrong, startTime, endTime }) => {
  return Math.floor(
    (totalEntries / 5 - totalWrong / 5) / ((endTime - startTime) / 1000 / 60)
  );
};

const calcAcc = ({ grossWPM, netWPM }) => {
  return Math.floor((netWPM / grossWPM) * 100);
};

export { calcGrossWPM, calcNetWPM, calcAcc };
