import { useState } from 'react';
import ProfileContainer from '../../components/UserCard/ProfileContainer/ProfileContainer';
import UserCard from '../../components/UserCard/ProfileCard/ProfileCard';

// Util
const titleCase = word =>
  `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;

export default function Profile() {
  const [subprofile, setSubprofile] = useState('creator');
  const handleSubprofile = sp => {
    setSubprofile(sp);
  };
  return (
    <ProfileContainer>
      <UserCard subprofile={subprofile} handleSubprofile={handleSubprofile} />
    </ProfileContainer>
  );
}
