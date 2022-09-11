import classes from './ProfileCard.module.css';
// Components
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ProfileData from './ProfileData/ProfileData';

export default function ProfileCard(props) {
  return (
    <div className={classes.container}>
      <ProfileHeader />
      <ProfileData user={props.user} />
    </div>
  );
}
