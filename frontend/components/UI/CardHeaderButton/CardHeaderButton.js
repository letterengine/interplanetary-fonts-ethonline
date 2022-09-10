import classes from './CardHeaderButton.module.css';

export default function CardHeaderButton(props) {
  return <button className={classes.button}>{props.children}</button>;
}
