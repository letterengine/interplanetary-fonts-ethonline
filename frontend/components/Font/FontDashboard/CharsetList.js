import classes from '../../../styles/FontDashboard.module.css';

export default function CharsetList(props) {
  return (
    <div className={classes['charset-container']}>
      <input className={classes['charset-list']} list='charsets' />
      <datalist id='charsets'>
        {props.charsets.map((charset, i) => (
          <option key={`charset-sel-${i}`} value={charset} />
        ))}
      </datalist>
    </div>
  );
}
