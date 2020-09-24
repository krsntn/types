import React from 'react';
import css from './displaytext.module.scss';

const DisplayText = (props) => {
  const {index, updatedArrayWords} = props;

  return (
    <div className={css.displaytext}>
      {updatedArrayWords &&
        updatedArrayWords.map((word, i) => (
          <span
            key={i}
            className={i === index ? `${css.word} ${css.highlight}` : css.word}
            data-error={word.error}
            data-pass={word.passed}>
            {word.text}{' '}
          </span>
        ))}
    </div>
  );
};

export default React.memo(DisplayText);
