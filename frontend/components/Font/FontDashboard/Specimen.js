import classes from '../../../styles/FontDashboard.module.css';

export default function Specimen(props) {
  return (
    <div
      className={classes.specimen}
      style={{ backgroundImage: `url("${props.specimen}")` }}
    ></div>
  );
}
