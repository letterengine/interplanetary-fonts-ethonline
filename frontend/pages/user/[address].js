import { useState } from 'react';
// Components
import ProfileCard from '../../components/Profile/ProfileCard/ProfileCard';
import DashboardContainer from '../../components/UI/DashboardContainer';
import ProfileDashboard from '../../components/Profile/ProfileDashboard/ProfileDashboard';
import Created from '../../components/Profile/ProfileDashboard/Created';
import Collabs from '../../components/Profile/ProfileDashboard/Collabs';
import Treasury from '../../components/Profile/ProfileDashboard/Treasury';
import Collected from '../../components/Profile/ProfileDashboard/Collected';
import Funded from '../../components/Profile/ProfileDashboard/Funded';

export default function Profile(props) {
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
    },
    getActiveButton = btns =>
      Object.values(btns)
        .filter(button => button.active)[0]
        .txt.toLowerCase();
  // State
  const [subprofile, setSubprofile] = useState('creator'),
    [buttons, setButtons] = useState({ ...profileButtons }.creator),
    [currentButton, setCurrentButton] = useState(getActiveButton(buttons));
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
        setCurrentButton(getActiveButton(temp));
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
        >
          {currentButton === 'created' ? (
            <Created />
          ) : currentButton === 'collabs' ? (
            <Collabs />
          ) : currentButton === 'treasury' ? (
            <Treasury />
          ) : currentButton === 'funded' ? (
            <Collected />
          ) : currentButton === 'funded' ? (
            <Funded />
          ) : currentButton === 'treasury' ? (
            <Treasury />
          ) : (
            ''
          )}
        </ProfileDashboard>
      ) : (
        ''
      )}
    </DashboardContainer>
  );
}
