import { useRef } from 'react';
import classes from '../../../styles/FontDashboard.module.css';

export default function FontTester(props) {
  const testerInputRef = useRef('Font Tester');

  return (
    <textarea
      style={{ fontFamily: props.cssname, fontWeight: props.weight }}
      className={classes.tester}
      placeholder='Font Tester'
      ref={testerInputRef}
    ></textarea>
  );
}
