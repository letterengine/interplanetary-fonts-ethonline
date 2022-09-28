import classes from '../../styles/NFTsAndStream.module.css';

export default function NFTsAndStream(props) {
  return (
    <div className={`${classes.container} ${props.classes}`}>
      {props.children}
    </div>
  );
}
