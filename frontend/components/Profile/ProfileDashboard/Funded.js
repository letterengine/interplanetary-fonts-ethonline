import classes from '../../../styles/UserDashboard.module.css';
// Components
import DashboardElement from '../../UI/DashboardElement';

export default function Funded() {
  return (
    <div className={classes['profile-elements']}>
      <DashboardElement>Funded</DashboardElement>
    </div>
  );
}
