import classes from '../../../styles/UserDashboard.module.css';
// Components
import DashboardElement from '../../UI/DashboardElement';

export default function Created() {
  return (
    <div className={classes['profile-elements']}>
      <DashboardElement>Created</DashboardElement>
    </div>
  );
}
