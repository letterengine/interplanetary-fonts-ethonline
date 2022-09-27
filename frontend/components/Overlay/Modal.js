import classes from '../../styles/Overlay.module.css';

export default function Modal(props) {
  return <div className={classes.modal}>{props.children}</div>;
}
