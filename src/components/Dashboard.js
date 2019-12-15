import React, {Fragment} from 'react';
import {Container, CssBaseline, Grid} from '@material-ui/core'
import { Header, Footer } from './layouts/index';
import DetailsPane from './details/DetailsPane';
import Summary from './summary/Summary';
import Flow from './flow/Flow';
import { green } from '@material-ui/core/colors';
import withWidth from '@material-ui/core/withWidth';
import NewActivity from './newActivity/NewActivity';

function Dashboard({width}) {
    const isSmall = (width=='xs' || width=='sm')
    return <Fragment>
      <CssBaseline />
      <Header />
      <Container style={{ paddingBottom: 50 }} fixed>
        <NewActivity />
        <Grid container direction={isSmall?'column-reverse':'row'}
          style={{zIndex:'1', position: "relative", maxWidth: 1200, margin: 'auto', paddingTop: 20, marginBottom: '20px'}} >
          <Grid item md={7} sm={12}>
            <Summary />
          </Grid>
          <Grid item md={5} sm={12}
            style={{
              paddingLeft: isSmall?'0':'10px',
              marginBottom: isSmall?'20px':'0px',
              maxHeight: isSmall?'75vh':'100%'}}  >
            <Flow  />
          </Grid>
        </Grid>
        <DetailsPane />
      </Container>
    </Fragment>;
}

export default withWidth()(Dashboard);
