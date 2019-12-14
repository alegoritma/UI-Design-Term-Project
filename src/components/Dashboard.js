import React, {Fragment} from 'react';
import {Container, CssBaseline, Grid} from '@material-ui/core'
import { Header, Footer } from './layouts/index';
import DetailsPane from './details/DetailsPane';
import Summary from './summary/Summary';

class Dashboard extends React.Component {
  render(){
    return <Fragment>
      <CssBaseline />
      <Header />

      <Container style={{ backgroundColor: '#e8e8e8', paddingBottom: 50 }} fixed>
        <Grid container style={{maxWidth: 1200, margin: 'auto', paddingTop: 20}}>
          <Grid item md={7} sm={12}>
            <Summary />
          </Grid>
          <Grid item md={4} sm={12}>

          </Grid>
        </Grid>
        <DetailsPane />
      </Container>
    </Fragment>;
  }
}

export default Dashboard;
