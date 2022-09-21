import { useState } from 'react';
import classes from '../../../styles/ProfileHeader.module.css';
// Components
import CardHeader from '../../UI/CardHeader';
import CardHeaderButton from '../../UI/CardHeaderButton';

export default function ProfileHeader(props) {
  // State
  const [cardColor] = useState({
      normal: 'darkblue',
      hover: 'red',
      active: 'yellow',
    }),
    [btns, setBtns] = useState([
      { nme: 'Creator', active: true, path: '/profile/creator' }, // Add username
      { nme: 'Collector', active: false, path: '/profile/collector' }, // Add username
    ]);
  // Event handlers
  const handleActiveButtons = clickedButton => {
    setBtns(prevBtns =>
      prevBtns.map(btn => {
        btn.nme = btn.nme;
        btn.active = btn.nme === clickedButton ? true : false;
        btn.path = btn.path;
        return btn;
      })
    );
  };
  // Component
  return (
    <CardHeader
      handleSubprofile={props.handleSubprofile}
      title='Profile'
      color={cardColor}
    >
      <div className={classes.buttons}>
        {btns.map((btn, i) => {
          return (
            <CardHeaderButton
              key={`btn-${i}`}
              active={btn.active}
              color={cardColor}
              handleActiveButtons={handleActiveButtons}
            >
              {btn.nme}
            </CardHeaderButton>
          );
        })}
      </div>
    </CardHeader>
  );
}
