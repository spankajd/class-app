import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.scss';

/**
 * Primary UI component for user interaction
 */
const Button = ({ primary, backgroundColor, size, disabled, label, className, ...props }) => {
  const mode = primary ? style['button--primary'] : style['button--secondary'];
  const disabledClass = disabled ? style['button--disabled'] : '';
  return (
    <button
      type="button"
      className={[style['button'], style[`button--${size}`], mode, disabledClass, className].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  disabled: false,
  onClick: undefined,
};

export default Button;