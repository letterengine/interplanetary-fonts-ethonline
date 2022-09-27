import classes from '../../../styles/UserDashboard.module.css';
// Components
import DashboardElement from '../../UI/DashboardElement';
import Button from '../../UI/Button';

export default function Treasury(props) {
  return (
    <div className={classes['profile-elements']}>
      <DashboardElement>
        <p>Balance</p>
        <p>{props.elements.balance.toFixed(2)} USDC</p>
      </DashboardElement>
      <Button>Withdraw</Button>
      <h5>Active FontStreams</h5>
      {props.elements.fontStreams.map((el, i) => (
        <DashboardElement key={`treasury-streams-${i}`}>
          <p>{el.txt}</p>
          <p>{el.ammount.toFixed(2)} USDC</p>
        </DashboardElement>
      ))}
      <Button>Create New FontStream</Button>
    </div>
  );
}
