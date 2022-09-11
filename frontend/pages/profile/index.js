import { useState } from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import DashboardContainer from '../../components/UI/DashboardContainer/DashboardContainer';

// Dummy Data
const testUser = {
  username: 'gutentype',
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

export default function Profile() {
  const [subprofile, setSubprofile] = useState('creator'),
    [user] = useState(testUser);
  const handleSubprofile = sp => {
    setSubprofile(sp);
  };
  return (
    <DashboardContainer>
      <ProfileCard
        user={user}
        subprofile={subprofile}
        handleSubprofile={handleSubprofile}
      />
    </DashboardContainer>
  );
}
