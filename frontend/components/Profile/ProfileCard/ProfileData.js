import classes from '../../../styles/CardData.module.css';

export default function ProfileData(props) {
  const fakeUser = {
    username: 'gutentype',
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Gutenberg.jpg',
    following: 0,
    followers: 1439,
    website: 'https://type-papa.xyz',
    about:
      'Johannes Gensfleisch zur Laden zum Gutenberg was a German inventor, printer, publisher, and goldsmith who introduced printing to Europe with his mechanical movable-type printing press.',
    social: [
      { icon: 'RD', url: 'https://app.radicle.xyz/gutentype' },
      { icon: 'GH', url: 'https://github.com/gutentype' },
      { icon: 'TW', url: 'https://twitter.com/gutentype' },
      { icon: 'TG', url: 'https://t.me/gutentype' },
      { icon: 'DC', url: 'https://discordapp.com/users/gutentype#5922' },
      { icon: 'IG', url: 'https://www.instagram.com/gutentype' },
    ],
  };

  return (
    <div className={classes.container}>
      <div
        style={{
          backgroundImage: `url("${props.user?.avatar ?? fakeUser.avatar}")`,
        }}
        className={classes.avatar}
      ></div>
      <h6 className={classes.username}>
        <em>{`@${props.user?.username ?? fakeUser.username}`}</em>
      </h6>
      <div className={classes.follow}>
        <p className={classes['follow-el']}>
          <strong>Followers:</strong>
          {` ${props.user?.followers ?? fakeUser.followers}`}
        </p>
        <p className={classes['follow-el']}>
          <strong>Following:</strong>
          {` ${props.user?.following ?? fakeUser.following}`}
        </p>
      </div>
      <a href={props.user?.website ?? fakeUser.website} target='blank'>
        {(props.user?.website ?? fakeUser.website).replace(/https?:\/\//, '')}
      </a>
      {props.connected && <button>Edit Profile</button>}
      <div className={classes.about}>
        <h6>About</h6>
        <p>{props.user?.about ?? fakeUser.about}</p>
      </div>
      <div className={classes.social}>
        {(props.user?.social ?? fakeUser.social).map((handle, i) => (
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
