import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {submitActivity} from '../../features/activities/actions';
import {updateActive, updateFields, updateActivityType, reset} from '../../features/newActivity/actions';
import { withStyles } from '@material-ui/core/styles';
import {Modal, Backdrop, Fade, Paper, FormControl, FormHelperText, Typography, List, ListItem, ListItemText, Collapse, ListItemSecondaryAction ,
Select, MenuItem, InputLabel, TextField, Input, InputAdornment, Chip, Grid, Button, IconButton, Grow,
ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Slider, Dialog, DialogTitle } from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import { indigo, grey, green, red, yellow } from '@material-ui/core/colors';
import {Done, AddCircle, ExpandMore, Equalizer, ViewWeek, Remove, Add } from '@material-ui/icons/';


function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}

const styles = (theme) => ({
  modal: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // overflowY: 'auto'
  },
  dialogHeader: {
    padding: '10px 0px',
    marginBottom: '1rem',
    color: 'white',
    backgroundColor: indigo[500]
  },
  // paper: {
  //   backgroundColor: theme.palette.background.paper,
  //   border: '2px solid #000',
  //   boxShadow: theme.shadows[5],
  //   padding: theme.spacing(2, 4, 3),
  // },
  container: {

    display: 'grid',
  },
  formContainer: {
    minWidth: '32rem',
    minHeight: '70vh',
    display: 'grid'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '23rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  chips: {
    display: 'flex',
    zIndex: '1',
    // justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
    backgroundColor: grey[200],
    width: '100%',
    borderRadius: '5rem',
    border: `solid 1px ${grey[600]}`,
    padding: 2
  },
  engagedPeopleSubText: {
    marginTop: '1.1rem',
    marginBottom: '2px',
    textAlign: 'center',
  },
  expansionPanel: {
    width: '90%',
    marginLeft: 'auto !important',
    marginRight: 'auto !important',
    backgroundColor: grey[300],
    marginTop: '-3px !important',
    paddingTop: '3px'
    // '&$expanded': {
    //   marginTop: '-3px !important',
    //   marginRight: 'auto !important',
    //   marginLeft: 'auto !important',
    // }
  },
  collapseHeader: {
    display: 'flex'
  },
  expansionDetail: {
    width: '20rem',
    paddingTop: '0px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  weightPercent: {
    ...theme.typography.button,
    margin: 'auto 2rem'
  },
  toggleButton: {
    margin: 'auto',
    marginTop: '.5rem',
    marginRight: '8px'
  },
  collapseListItemText: {
    marginLeft: '1rem'
  },
  collapseHeaderText: {
    // display: 'flex'
  },
  collapseHeaderSubtext: {
    marginLeft: '.5rem !important'
  },
  adjustList: {
    marginLeft: '1rem',
    marginRight: '1rem'
  },
  adjustListItem: {
    display: 'block',
    padding: '2px'
  },
  listItemHeading: {
    marginLeft: '.3rem'
  },
  adjustListItemText: {
    marginTop: '0px',
    marginBottom: '0px'
  }
});


class NewActivity extends Component {
  constructor(props) {
    super(props);
    let weightsMap = {}
    props.house.users.forEach((user) => {
      weightsMap[user] = false;
    })
    this.state = {
      weightsMap,
      selecteds: [],
      total: 0,
      toggle: false,
      noPeopleSelected: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChipSelect = this.handleChipSelect.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.setTotal = this.setTotal.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.submit = this.submit.bind(this);
    this.handleDateChange(new Date());
  }
  handleChange(e){
    this.props.updateFields({[e.target.name]: e.target.value})
  }
  handleDateChange(d){
    this.props.updateFields({
      date: (
            `${String(d.getFullYear())}.`+
            `${String(d.getMonth() + 1).padStart(2, '0')}.`+
            `${String(d.getDate()).padStart(2, '0')}`
          )
        })
  }
  handleChipSelect(name, e){
    console.log(e, name);
    const {weightsMap, toggle} = this.state;
    if (weightsMap[name] !== false){ // deselecting
      let selecteds = [];
      Object.keys(weightsMap).forEach((_name) => {
        if (weightsMap[_name] !== false && _name !== name ){selecteds.push(_name);}
      })
      this.setState({
        weightsMap: {...weightsMap, [name]: false}, selecteds, toggle: (toggle&&selecteds.length!==0)
      })
      console.log(selecteds);
    } else {  // selecting
      let selecteds = [];
      Object.keys(weightsMap).forEach((_name) => {
        if (weightsMap[_name] !== false || _name === name){selecteds.push(_name);}
      })
      this.setState({
        weightsMap: {...weightsMap, [name]: 0}, selecteds
      })
      console.log(selecteds);
    }
  }
  setTotal(name, val){
    const {weightsMap, selecteds} = this.state;
    let total = 0;
    selecteds.forEach(_name => total += (_name===name)?val:weightsMap[_name])
    this.setState({total: total})
  }
  handleWeightChange(name, val){
    this.setState(prevState => ({weightsMap: {...prevState.weightsMap, [name]: val }}))
  }
  toggleCollapse(){
    this.setState(prevState=>({toggle: !prevState.toggle}))
  }
  submit(e){
    console.log(e);
    e.preventDefault();
    if (this.state.selecteds.length === 0){
      console.log("selecteds 0", this.state.selecteds.length);
      this.setState({noPeopleSelected: true},
        ()=>{setTimeout(() => { this.setState({noPeopleSelected: false}) }, 2000);})
    } else {
      console.log("selecteds not 0", this.state.selecteds.length);
      const {toggle, total, weightsMap, selecteds} = this.state;
      let weights;
      if (toggle){
        console.log("Collapse is open");
        if (total === 100){
          console.log("total is 100");
          weights = selecteds.map((name) => ({name, weight: weightsMap[name]}))
        } else {console.log("total is not 100 ->", total); return} // Maybe should raise warning? ******************************************
      } else {
        console.log("Collapse is open");

        weights = selecteds.map((name) => ({name, weight: 1/selecteds.length}))
      }
      const {activityType, fields, house} = this.props;

      this.props.submitActivity(activityType, {...fields, paidBy: house.currentUser, weights})
      // this.props.updateActive(false)
      this.props.reset()
    }
  }
  render(){
    const {active, activityType, fields, classes, house} = this.props;
    const {weightsMap, selecteds, total, toggle} = this.state;

    return (
        <Dialog
          scroll='body'
          className={classes.modal}
          open={active}
          onClose={this.props.reset}
        >

          <DialogTitle id="simple-dialog-title"
            disableTypography
            className={classes.dialogHeader}>
            <Typography variant='h5' style={{margin: 'auto', textAlign: 'center'}}>
              New Activity
            </Typography>
          </DialogTitle>
          <Paper className={classes.container}>
            <Paper className={classes.formContainer}>
              <form onSubmit={this.submit} style={{display: 'grid', height: 'fit-content'}}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="activityType-label">Activity Type</InputLabel>
                  <Select required

                    labelId="activityType-label"
                    id="activityType"
                    name='activityType'
                    defaultValue={activityType}
                    onChange={this.props.updateActivityType}
                  >
                    <MenuItem value={'payments'}>Payment</MenuItem>
                    <MenuItem value={'bills'}>Bill</MenuItem>
                    <MenuItem value={'fixedExpenses'}>Fixed Expense</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField required
                    id="name"
                    name="name"
                    label="Activity Name"
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="cost-labelid">Cost *</InputLabel>
                  <Input required
                    // labelId="cost-labelid"
                    id="cost"
                    name="cost"
                    type="number"
                    inputProps={{ min: "0", step: "1" }}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker required
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date"
                      label="Date"
                      // Set initial date also in store ***************************
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                          'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel required shrink htmlFor="chips-container">Engaged People</InputLabel>
                  <FormHelperText className={classes.engagedPeopleSubText}>
                    Select people who will pay. Deselect yourself if this is a debt.
                  </FormHelperText>
                  <Paper className={classes.chips} id="chips-container">
                    {Object.keys(weightsMap).map((name,i) => {
                      if (weightsMap[name] === false){
                        return <Chip
                          key={`chip-select-${i}`}
                          clickable
                          onClick={(e)=>this.handleChipSelect(name, e)}
                          variant="outlined"
                          size="small"
                          label={name==house.currentUser?'You':name}
                          icon={<AddCircle />} />
                      } else {
                        return <Chip
                          key={`chip-select-${i}`}
                          clickable
                          onClick={(e)=>this.handleChipSelect(name, e)}
                          color="primary"
                          size="small"
                          label={name==house.currentUser?'You':name}
                          icon={<Done />} />
                      }
                    })}
                  </Paper>
                  <Grow
                    style={{position: 'absolute', border: 'solid 1px '+yellow[1000], marginLeft:'.5rem', marginTop:'2.39rem', zIndex:'2', borderRadius: '1rem', paddingLeft: '1rem', paddingRight: '1rem'}}
                    timeout={{exit: 1000}}
                    in={this.state.noPeopleSelected}
                  >
                    <Typography variant="subtitle1" style={{ backgroundColor: yellow[800], color: red[50]}}>
                      Please select at least one Engaged Person
                    </Typography>
                  </Grow>
                  <Paper className={classes.expansionPanel}>
                    <div className={classes.collapseHeader}>
                      <ListItemText
                        disableTypography
                        className={classes.collapseListItemText}
                        primary={
                          <Typography variant="subtitle2" className={classes.collapseHeaderText}>
                            {toggle
                              ?<strong style={{color: indigo[500]}}>{`${total}% Distributed`}</strong>
                              :(selecteds.length===0?'Please select Engaged People':'Splitting Equally')
                            }
                          </Typography>
                        }
                        secondary={selecteds.length===0?false:
                        <Typography variant="caption" style={{color: toggle?(total==100)?green[800]:red[800]:grey[700]}} className={classes.collapseHeaderSubtext}>
                          {toggle
                            ?(total==100
                              ?"Distribution is valid!"
                              :`Distribution is not valid! ${total<100?(100-total)+"% more needed!":(total-100)+"% need to be excluded!"}`)
                            :(`Each selected people pays ${roundToTwo(fields.cost/selecteds.length)}$`)}
                        </Typography>
                        }
                      />
                      {selecteds.length!==0&&
                        <IconButton
                          size="small"
                          variant="contained"
                          onClick={this.toggleCollapse} className={classes.toggleButton}>
                          {toggle?<Equalizer />:<ViewWeek />}
                        </IconButton>
                      }
                    </div>
                    <Collapse className={classes.expansionDetail} in={toggle}>
                      <List className={classes.adjustList}>
                        {selecteds.map((name, i) => {
                          return <ListItem className={classes.adjustListItem} key={`input-slider-listitem-${name}`}>
                            <Typography
                              id={`input-slider-${name}`}
                              variant='subtitle2'
                              className={classes.listItemHeading} >
                              {`${name} (${weightsMap[name]}%)`}
                            </Typography>
                            <Grid container>
                              <Grid item xs={1}>
                                <IconButton size='small' onClick={
                                  (e) => {this.handleWeightChange(name,
                                    (weightsMap[name]>=1?weightsMap[name]-1:weightsMap[name]))
                                    this.setTotal()
                                  }}>
                                  <Remove fontSize="inherit" />
                                </IconButton>
                              </Grid>
                              <Grid item xs={10} style={{paddingLeft: '.5rem', paddingRight: '.5rem'}}>
                                <Slider
                                  style={{margin: 'auto'}}
                                  step={1}
                                  key={`weights-slider-${i}`}
                                  value={weightsMap[name]}
                                  onChange={(e,val) => this.handleWeightChange(name, val)}
                                  onChangeCommitted={(e,val)=>this.setTotal(name, val)}
                                  aria-labelledby={`input-slider-${name}`}
                                />
                              </Grid>
                              <Grid item xs={1}>
                                <IconButton size='small' onClick={
                                  (e) => {this.handleWeightChange(name,
                                    (weightsMap[name]<=99?weightsMap[name]+1:weightsMap[name]))
                                    this.setTotal()
                                  }
                                }>
                                  <Add fontSize="inherit" />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </ListItem>
                        })}
                      </List>
                    </Collapse>
                  </Paper>
                </FormControl>
                <Button type="submit">
                  Add
                </Button>
              </form>
            </Paper>
          </Paper>
        </Dialog>
        );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.newActivity,
    house: state.house
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateActive: (bool) => dispatch(updateActive(bool)),
    updateActivityType: ({target}) => dispatch(updateActivityType(target.value)),
    updateFields: (fields) => dispatch(updateFields(fields)),
    reset: () => dispatch(reset()),
    submitActivity: (activityType, fields) => dispatch(submitActivity(activityType, fields))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewActivity));
