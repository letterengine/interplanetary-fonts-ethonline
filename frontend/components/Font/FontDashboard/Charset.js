import classes from '../../../styles/FontDashboard.module.css';
// Components
import Letter from './Letter';

export default function Charset(props) {
  return (
    <div className={classes['charset-grid']}>
      {[...props.charset].map((letter, i) => (
        <Letter
          key={`char-${i}`}
          cssname={props.cssname}
          weight={props.weight}
          unit={props.unit}
          handlePrice={props.handlePrice}
        >
          {letter}
        </Letter>
      ))}
    </div>
  );
}
