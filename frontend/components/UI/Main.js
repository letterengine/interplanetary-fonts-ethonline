import classes from '../../styles/Main.module.css';

export default function Main(props) {
  return <main className={classes.main}>{props.children}</main>;
}
