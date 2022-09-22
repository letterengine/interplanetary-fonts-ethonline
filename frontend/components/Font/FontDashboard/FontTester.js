import { useState } from 'react';
import classes from '../../../styles/FontDashboard.module.css';

export default function FontTester(props) {
  const [testerValue, setTesterValue] = useState('Font Tester');

  // Event handlers
  const handleType = e => {
    setTesterValue(e.target.value);
  };

  return (
    <textarea
      style={{ fontFamily: props.cssname, fontWeight: props.weight }}
      className={classes.tester}
      value={testerValue}
      onChange={handleType}
    ></textarea>
  );
}
