import classes from '../../../styles/ProfileData.module.css';

export default function ProfileData(props) {
  return (
    <div className={classes.container}>
      <div
        style={{
          backgroundImage: `url("${
            props.user?.avatar ??
            'https://upload.wikimedia.org/wikipedia/commons/8/81/Firmin_Didot_%281764-1836%29.png'
          }")`,
        }}
        className={classes.avatar}
      ></div>
      <h6 className={classes.username}>
        <em>{`@${props.user?.username ?? 'didot'}`}</em>
      </h6>
      <div className={classes.follow}>
        <p className={classes['follow-el']}>
          <strong>Followers:</strong>
          {` ${props.user?.followers ?? 100}`}
        </p>
        <p className={classes['follow-el']}>
          <strong>Following:</strong>
          {` ${props.user?.following ?? 3}`}
        </p>
      </div>
      <a href={props.user?.website ?? 'https://didot.xyz'} target='blank'>
        {props.user?.website.replace(/https?:\/\//, '') ?? 'didot.xyz'}
      </a>
      <div className={classes.about}>
        <h6>About</h6>
        <p>{props.user?.about ?? 'I created the Didot Typeface'}</p>
      </div>
      <div className={classes.social}>
        {props.user?.social.map((handle, i) => (
          <a
            key={`handle-${i}`}
            className={classes.handle}
            href={handle.url}
            target='blank'
          >
            {handle.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
