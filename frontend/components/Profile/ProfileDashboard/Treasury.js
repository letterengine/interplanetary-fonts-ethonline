import classes from '../../../styles/UserDashboard.module.css';
// Components
import DashboardElement from '../../UI/DashboardElement';

export default function Treasury() {
  return (
    <div className={classes['profile-elements']}>
      <DashboardElement>Treasury</DashboardElement>
    </div>
  );
}
