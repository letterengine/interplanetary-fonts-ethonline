import classes from './ProfileData.module.css';

export default function ProfileData(props) {
  return (
    <div className={classes.container}>
      <div
        style={{ backgroundImage: `url("${props.user.avatar}")` }}
        className={classes.avatar}
      ></div>
      <h6 className={classes.username}>
        <em>{`@${props.user.username}`}</em>
      </h6>
      <div className={classes.follow}>
        <p className={classes['follow-el']}>
          <strong>Followers:</strong>
          {` ${props.user.followers}`}
        </p>
        <p className={classes['follow-el']}>
          <strong>Following:</strong>
          {` ${props.user.following}`}
        </p>
      </div>
      <a href={props.user.website} target='blank'>
        {props.user.website.replace(/https?:\/\//, '')}
      </a>
      <div className={classes.about}>
        <h6>About</h6>
        <p>{props.user.about}</p>
      </div>
      <div className={classes.social}>
        {props.user.social.map((handle, i) => (
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
