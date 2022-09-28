import Button from '../../components/UI/Button';
import NFTsAndStream from '../../components/UI/NFTsAndStream';
import classes from '../../styles/NFTsAndStream.module.css';

const fakeStream = {
  nme: 'Some FontStream',
  parentp: { nme: 'Some Font', url: '/font/test-font' },
  time: '180 days',
  progress: { current: 23.1092, total: 2560.1898 },
  superfluid:
    'https://app.superfluid.finance/token/polygon-mumbai/0x96b82b65acf7072efeb00502f45757f254c2a0d4',
};

export default function Stream() {
  return (
    <NFTsAndStream nme={fakeStream.nme} parentp={fakeStream.parentp}>
      <div className={classes.element}>
        Stream time <span>{fakeStream.time}</span>
      </div>
      <div className={classes.element}>
        Progress
        <span>
          {`${fakeStream.progress.current} / ${fakeStream.progress.total}`}
        </span>
      </div>
      <div className={classes.element}>
        Superfluid{' '}
        <a href={fakeStream.superfluid} target='blank'>
          Go to dashboiard
        </a>
      </div>
      <div className={classes.element}>
        <strong>Supporters</strong> <Button>See</Button>
      </div>
      <div className={classes.buttons}>
        <Button>Collaborate</Button>
        <Button>Fund</Button>
      </div>
    </NFTsAndStream>
  );
}
