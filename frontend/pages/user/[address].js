import { useState } from 'react';
// Components
import ProfileCard from '../../components/Profile/ProfileCard/ProfileCard';
import DashboardContainer from '../../components/UI/DashboardContainer';
import ProfileDashboard from '../../components/Profile/ProfileDashboard/ProfileDashboard';
// Util
const profileButtons = {
  creator: {
    created: { txt: 'Created', active: true },
    collabs: { txt: 'Collabs', active: false },
    treasury: { txt: 'Treasury', active: false },
  },
  collector: {
    collected: { txt: 'Collected', active: true },
    funded: { txt: 'Funded', active: false },
  },
};

export default function Profile(props) {
  const [subprofile, setSubprofile] = useState('creator'),
    [buttons, setButtons] = useState({ ...profileButtons }.creator);
  // Event Handlers
  const handleSubprofile = sp => {
      setSubprofile(sp.toLowerCase());
      setButtons({ ...profileButtons }[sp.toLowerCase()]);
    },
    handleActiveDashboard = e => {
      setButtons(prevButtons => {
        const temp = Object.fromEntries(
          Object.entries(prevButtons).map(entry => {
            if (entry[1].txt === e.target.textContent) {
              entry[1].active = true;
            } else {
              entry[1].active = false;
            }
            return entry;
          })
        );
        return temp;
      });
    };
  return (
    <DashboardContainer>
      <ProfileCard
        user={props.user}
        subprofile={subprofile}
        connected={props.connected}
        handleSubprofile={handleSubprofile}
      />
      {props.connected ? (
        <ProfileDashboard
          buttons={buttons}
          handleActiveDashboard={handleActiveDashboard}
        />
      ) : (
        ''
      )}
    </DashboardContainer>
  );
}
