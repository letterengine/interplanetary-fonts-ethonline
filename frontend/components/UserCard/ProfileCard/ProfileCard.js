import { Fragment } from 'react';
import classes from './ProfileCard.module.css';
import CardHeader from '../../UI/CardHeader/CardHeader';
import CardHeaderButton from '../../UI/CardHeaderButton/CardHeaderButton';

export default function ProfileCard(props) {
  return (
    <div className={classes.container}>
      <CardHeader
        handleSubprofile={props.handleSubprofile}
        title={props.title}
        color='darkblue'
      >
        <div className={classes.buttons}>
          <CardHeaderButton>Creator</CardHeaderButton>
          <CardHeaderButton>Collector</CardHeaderButton>
        </div>
      </CardHeader>
      {props.children}
    </div>
  );
}
