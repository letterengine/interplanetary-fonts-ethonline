import classes from './ProfileContainer.module.css';

export default function ProfileContainer(props) {
  return <div className={classes.container}>{props.children}</div>;
}
