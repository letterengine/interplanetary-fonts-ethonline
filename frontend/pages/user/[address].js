import { useState } from 'react';
import ProfileCard from '../../components/Profile/ProfileCard/ProfileCard';
import DashboardContainer from '../../components/UI/DashboardContainer';

export default function Profile(props) {
  const [subprofile, setSubprofile] = useState('creator');
  const handleSubprofile = sp => {
    setSubprofile(sp);
  };
  return (
    <DashboardContainer>
      <ProfileCard
        user={props.user}
        subprofile={subprofile}
        handleSubprofile={handleSubprofile}
      />
    </DashboardContainer>
  );
}
