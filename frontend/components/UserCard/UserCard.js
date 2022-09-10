import ProfileCard from '../UI/ProfileCard/ProfileCard';

export default function UserCard(props) {
  return (
    <ProfileCard
      handleSubprofile={props.handleSubprofile}
      title={props.title}
    ></ProfileCard>
  );
}
