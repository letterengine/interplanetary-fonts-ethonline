import { useState } from 'react';
import classes from '../../../styles/FontDashboard.module.css';
// Components
import Charset from './Charset';
import CharsetList from './CharsetList';
import FontTester from './FontTester';
import Specimen from './Specimen';
import MintButton from './MintButton';

export default function FontDashboard(props) {
  const [price, setPrice] = useState(0);
  // Event Handler
  const handlePrice = txa => {
    setPrice(prevPrice => Math.abs(prevPrice + txa));
  };
  return (
    <div className={classes.container}>
      <Specimen specimen={props.font.specimen} />
      <FontTester cssname={props.font.cssname} weight={props.font.weight} />
      <p>
        Please select the characters you want to mint or select an option of
        pre-selected charsets in the list bellow.
      </p>
      <CharsetList charsets={props.font.preselect} />
      <Charset
        cssname={props.font.cssname}
        weight={props.font.weight}
        charset={props.font.charset}
        unit={props.font.price / props.font.charset.length}
        handlePrice={handlePrice}
      />
      <div className={classes.checkout}>
        <h4>Price: {price.toFixed(2)} USDC</h4>
        <MintButton />
      </div>
    </div>
  );
}
