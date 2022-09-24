import { useRouter } from 'next/router';

/*
import Link from 'next/link';
import Button from './Button';
import classes from '../../styles/ConnectedMenu.module.css';
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
)}
*/

export default function ConnectedMenu(props) {
  const router = useRouter();
  return (
    <div>
      <p>{account.address}</p>
      <a
        onClick={props.handleDisconnect}
        className={joinClassNames(
          account ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
          'block px-4 py-2 text-sm cursor-pointer'
        )}
      >
        Log Out
      </a>
    </div>
  );
}
