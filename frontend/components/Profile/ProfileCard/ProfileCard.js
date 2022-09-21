import classes from '../../../styles/ProfileCard.module.css';
// Components
import ProfileHeader from './ProfileHeader';
import ProfileData from './ProfileData';

export default function ProfileCard(props) {
  return (
    <div className={classes.container}>
      <ProfileHeader connected={props.connected} />
      <ProfileData user={props.user} />
    </div>
  );
}
