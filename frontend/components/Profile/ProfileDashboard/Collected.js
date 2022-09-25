import classes from '../../../styles/UserDashboard.module.css';
// Components
import DashboardElement from '../../UI/DashboardElement';

export default function Collected() {
  return (
    <div className={classes['profile-elements']}>
      <DashboardElement>Collected</DashboardElement>
    </div>
  );
}
