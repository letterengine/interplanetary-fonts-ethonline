import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ConnectedMenu() {
  const router = useRouter();
  return (
    <div>
      <Link href={props.user ? `/user/${props.user.address}` : '/'}>
        <button className={buttonClass}>User Profile</button>
      </Link>
      <Link href={props.user ? `/user/${props.user.address}` : '/'}>
        <button className={buttonClass}>Disconnect</button>
      </Link>
    </div>
  );
}
