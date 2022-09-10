import classes from './CardHeader.module.css';
import Link from 'next/link';

export default function CardHeader(props) {
  return (
    <div
      style={{ backgroundColor: `var(--${props.color})` }}
      className={classes.header}
    >
      <p>{props.title}</p>
      {props.children}
    </div>
  );
}
