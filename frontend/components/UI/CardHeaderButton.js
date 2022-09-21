import { useState } from 'react';
import classes from '../../styles/CardHeaderButton.module.css';

export default function CardHeaderButton(props) {
  // States
  const [hover, setHover] = useState(false);
  // Event handlers
  const handleHover = e => {
      if (!props.active) setHover(true);
    },
    handleOut = e => {
      setHover(false);
    },
    handleClick = e => {
      props.handleActiveButtons(e.target.textContent);
    };
  // Component
  return (
    <button
      className={`${classes.button} ${
        !hover ? classes[props.color.normal] : classes[props.color.hover]
      } ${props.active && classes[props.color.active]}`}
      onMouseOver={handleHover}
      onMouseOut={handleOut}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}
