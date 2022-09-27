import { useState } from 'react';
import classes from '../../../styles/UserDashboard.module.css';
// Components
import DashboardElement from '../../UI/DashboardElement';
import Button from '../../UI/Button';
import Withdraw from '../../Overlay/Withdraw';
import CreateStream from '../../Overlay/CreateStream';
import Unwrap from '../../Overlay/Unwrap';

export default function Treasury(props) {
  const [clicked, setClicked] = useState(''),
    [mounted, setMounted] = useState(false),
    handleMount = bool => {
      setMounted(bool);
    };
  return (
    <>
      <div className={classes['profile-elements']}>
        <DashboardElement>
          <p>Balance</p>
          <p>{props.elements.balance.toFixed(9)} MATIC</p>
        </DashboardElement>
        <Button onClick={() => (setMounted(true), setClicked('withdraw'))}>
          Withdraw
        </Button>
        <h5>Active FontStreams</h5>
        {props.elements.fontStreams.map((el, i) => (
          <DashboardElement key={`treasury-streams-${i}`}>
            <p>{el.txt}</p>
            <p>{el.ammount.toFixed(18)} MATIC</p>
            <Button
              onClick={() => (setMounted(true), setClicked('unwrap'))}
              className={classes.unwrap}
            >
              Unwrap
            </Button>
          </DashboardElement>
        ))}
        <Button onClick={() => (setMounted(true), setClicked('stream'))}>
          Create New FontStream
        </Button>
      </div>
      {mounted && clicked === 'withdraw' ? (
        <Withdraw mounted={mounted} handleMount={handleMount} />
      ) : mounted && clicked === 'stream' ? (
        <CreateStream mounted={mounted} handleMount={handleMount} />
      ) : mounted && clicked === 'unwrap' ? (
        <Unwrap mounted={mounted} handleMount={handleMount} />
      ) : (
        ''
      )}
    </>
  );
}
