import { useState } from 'react';
import classes from '../../../styles/FontDashboard.module.css';
// Components
import Charset from './Charset';
import CharsetList from './CharsetList';
import FontTester from './FontTester';
import Specimen from './Specimen';
import MintButton from './MintButton';

export default function FontDashboard(props) {
  const [price, setPrice] = useState(0),
    [chars, setChars] = useState(
      [...props.font.charset].map(ch => {
        return { char: ch, checked: false, clss: '' };
      })
    ),
    [unit] = useState(props.font.price / props.font.charset.length);
  // Event Handler
  const handleLetterClick = e => {
      const char = e.target.textContent,
        ix = chars.findIndex(ch => char == ch.char),
        tempChars = [...chars];
      tempChars[ix].checked = !tempChars[ix].checked;
      tempChars[ix].clss = tempChars[ix].clss === '' ? 'letter-checked' : '';
      //  i = chars.findIndex(ch);
      setChars(tempChars);
      setPrice(prevPrice =>
        Math.abs(prevPrice + (tempChars[ix].checked ? unit : -unit))
      );
    },
    handleCharList = e => {
      const list = e.target.value,
        filteredChars = chars.map(ch => {
          if (
            list === 'Complete' ||
            (list === 'Uppercase' && ch.char.match(/[A-Z]/)) ||
            (list === 'Lowercase' && ch.char.match(/[a-z]/))
          ) {
            ch.checked = true;
            ch.clss = 'letter-checked';
          } else {
            ch.checked = false;
            ch.clss = '';
          }
          return ch;
        });
      setChars(filteredChars);
      setPrice(filteredChars.filter(ch => ch.checked).length * unit);
    };
  return (
    <div className={classes.container}>
      <Specimen
        fontname={props.font.nme}
        cssname={props.font.cssname}
        weight={props.font.weight}
        specimen={props.font.specimen}
      />
      <FontTester cssname={props.font.cssname} weight={props.font.weight} />
      <p>
        Please select the characters you want to mint or select an option of
        pre-selected charsets in the list bellow.
      </p>
      <CharsetList
        charsets={props.font.preselect}
        handleCharList={handleCharList}
      />
      <Charset
        cssname={props.font.cssname}
        weight={props.font.weight}
        chars={chars}
        handleLetterClick={handleLetterClick}
      />
      <div className={classes.checkout}>
        <h5>Price: {price.toFixed(2)} USDC</h5>
        <MintButton />
      </div>
    </div>
  );
}