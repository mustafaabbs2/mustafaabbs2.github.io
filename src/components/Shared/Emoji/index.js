import React from 'react';
import PropTypes from 'prop-types';

const Emoji = props => {
  const { label, symbol } = props;

  return (
    <span
      className="emoji"
      role="img"
      aria-label={label}
      aria-hidden={label ? 'false' : 'true'}
    >
      {symbol}
    </span>
  );
};

Emoji.propTypes = {
  label: PropTypes.string,
  symbol: PropTypes.string.isRequired,
};

Emoji.defaultProps = {
  label: '',
};

export default Emoji;
