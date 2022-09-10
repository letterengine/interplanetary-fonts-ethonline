import { useState } from 'react';
import classes from './ProfileCard.module.css';
import CardHeader from '../../UI/CardHeader/CardHeader';
import CardHeaderButton from '../../UI/CardHeaderButton/CardHeaderButton';

export default function ProfileCard(props) {
  // State
  const cardColor = { normal: 'darkblue', hover: 'red', active: 'yellow' },
    [btns, setBtns] = useState([
      { nme: 'Creator', active: true },
      { nme: 'Collector', active: false },
    ]);
  // Event handlers
  const handleActiveButtons = clickedButton => {
    setBtns(prevBtns =>
      prevBtns.map(btn => {
        btn.nme = btn.nme;
        btn.active = btn.nme === clickedButton ? true : false;
        return btn;
      })
    );
    console.log(clickedButton);
  };
  // Component
  return (
    <div className={classes.container}>
      <CardHeader
        handleSubprofile={props.handleSubprofile}
        title='Profile'
        color={cardColor}
      >
        <div className={classes.buttons}>
          {btns.map((btn, i) => {
            return (
              <CardHeaderButton
                active={btn.active}
                key={`btn-${i}`}
                color={cardColor}
                handleActiveButtons={handleActiveButtons}
              >
                {btn.nme}
              </CardHeaderButton>
            );
          })}
        </div>
      </CardHeader>
      {props.children}
    </div>
  );
}
