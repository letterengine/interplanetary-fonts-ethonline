import Link from 'next/link';
import { useRouter } from 'next/router';
import classes from '../../styles/ConnectedMenu.module.css';
// Components
import Button from './Button';

export default function ConnectedMenu(props) {
  const router = useRouter();
  return (
    <div className={`${classes.container} ${props.menu && classes.open}`}>
      <Link href={`/user/${props.user.address}`}>
        <a className={classes['user-profile']}>User Profile</a>
      </Link>
      <Button onClick={props.handleDisconnect} className={classes.button}>
        Disconnect
      </Button>
    </div>
  );
}
