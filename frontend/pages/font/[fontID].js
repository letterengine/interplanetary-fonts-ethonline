import { useState } from 'react';
// Components
import FontCard from '../../components/Font/FontCard/FontCard';
import DashboardContainer from '../../components/UI/DashboardContainer';

export default function Font(props) {
  return (
    <DashboardContainer>
      <FontCard font={props.font} />
    </DashboardContainer>
  );
}
