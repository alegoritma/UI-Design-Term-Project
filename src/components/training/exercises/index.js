import React, {Fragment} from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core';

const styles = {
  Paper: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 500,
    overflowY: 'auto'
  }
}


export default ({exercises, category}) => {
  return <Grid container>
    <Grid item sm>
      <Paper style={styles.Paper}>
        {exercises.map(([group, exercises]) =>
          !category || category === group?
            <Fragment key={`excercise-group-${group}`}>
              <Typography
                variant="h6"
                style={{textTransform: 'capitalize'}}
              >{group}</Typography>
              <List component="ul">
                {exercises.map(({title}) =>
                  <ListItem key={`exercise-muscle-${title}`} button>
                    <ListItemText primary={title} />
                  </ListItem>
                )}
              </List>
            </Fragment>:null)}
      </Paper>;
    </Grid>
    <Grid item sm>
      <Paper style={styles.Paper}>
        <Typography variant="h3">
          Welcome
        </Typography>
        <Typography style={{marginTop: 15}} variant="subtitle1">
          Please select an exercise from the list on the left.
        </Typography>
      </Paper>
    </Grid>
  </Grid>;
}
