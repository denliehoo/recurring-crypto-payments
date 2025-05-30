import { FC } from 'react';

import Grid from '@mui/material/Grid';

import SideBar from './side-bar';
import Modals from './modals';
import Content from './content';

const CheckoutPage: FC = () => {
  return (
    <>
      <SideBar />
      <Grid sm={4} md={4} />
      <Content />
      <Modals />
    </>
  );
};

export default CheckoutPage;
