import classes from './DashboardContainer.module.css';

export default function DashboardContainer(props) {
  return <div className={classes.container}>{props.children}</div>;
}
