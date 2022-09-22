import { useState } from 'react';
import classes from '../../../styles/FontDashboard.module.css';

export default function Letter(props) {
  const [checked, setChecked] = useState(false);

  // Event handler
  const handleCheck = () => {
    setChecked(prevChecked => !prevChecked);
    props.handlePrice(props.unit * (!checked ? 1 : -1));
  };

  return (
    <button
      style={{ fontFamily: props.cssname, fontWeight: props.weight }}
      className={`${classes.letter} ${checked && classes['letter-checked']}`}
      onClick={handleCheck}
    >
      {props.children}
    </button>
  );
}
