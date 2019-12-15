import React, {Component} from 'react';
import {connect} from 'react-redux';
import {submitActivity} from '../../features/activities/actions';
import {updateActive, updateFields, reset} from '../../features/newActivity/actions';
import { withStyles } from '@material-ui/core/styles';
import {Modal, Backdrop, Fade, Paper, FormControl, FormHelperText, Typography,
Select, MenuItem, InputLabel, TextField, Input, InputAdornment, Chip, Grid,
ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Slider } from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import { indigo, grey } from '@material-ui/core/colors';
import {Done, AddCircle, ExpandMore } from '@material-ui/icons/';

console.log(Chip);
const styles = (theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // paper: {
  //   backgroundColor: theme.palette.background.paper,
  //   border: '2px solid #000',
  //   boxShadow: theme.shadows[5],
  //   padding: theme.spacing(2, 4, 3),
  // },
  container: {
    backgroundColor: indigo[500],
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
    marginBottom: '2px',
    textAlign: 'center',
  },
  expansionPanel: {
    width: '90%',
    marginLeft: 'auto !important',
    marginRight: 'auto !important',
    backgroundColor: grey[300],
    marginTop: '-3px !important',
    '&$expanded': {
      marginTop: '-3px !important',
      marginRight: 'auto !important',
      marginLeft: 'auto !important',
    }
  },
  expansionSummary: {
      margin: 'auto !important',
  },
  heading: {
    // fontSize: theme.typography.pxToRem(15),
    // fontWeight: theme.typography.fontWeightRegular,
    flexShrink: 0,

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
      total: 1
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChipSelect = this.handleChipSelect.bind(this);
    this.handleExpansionChange = this.handleExpansionChange.bind(this);
    this.splitEqually = this.splitEqually.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.setTotal = this.setTotal.bind(this);
  }

  handleChange(e){
    console.log(e.target.name, e.target.value)
  }
  handleDateChange(d){
    console.log(d)
  }
  handleChipSelect(name, e){
    console.log(e, name);
    const {weightsMap} = this.state;
    if (weightsMap[name] !== false){ // deselecting
      let selecteds = [];
      Object.keys(weightsMap).forEach((_name) => {
        if (weightsMap[_name] !== false && _name !== name ){selecteds.push(_name);}})
      this.setState({
        weightsMap: {...weightsMap, [name]: false}, selecteds
      })
      console.log(selecteds);
    } else {  // selecting
      let selecteds = [];
      Object.keys(weightsMap).forEach((_name) => {
        if (weightsMap[_name] !== false || _name === name){selecteds.push(_name);}})
      this.setState({
        weightsMap: {...weightsMap, [name]: 100}, selecteds
      })
      console.log(selecteds);
    }
  }
  handleExpansionChange(e, opened){
    this.splitEqually()
  }
  splitEqually(){
    const {weightsMap, selecteds} = this.state;
    let _weightsMap = {}
    Object.keys(weightsMap).forEach((name) => {
      if (weightsMap[name] !== false){
        _weightsMap[name] = 100
      }
    })
    this.setState({weightsMap: {...weightsMap,..._weightsMap}, weightsEqual: true})
  }
  setTotal(){
    const {weightsMap} = this.state;
    let total = 0;
    Object.values(weightsMap).forEach(val => total+=(val===false)?0:val)
    this.setState({total: total/100})
  }
  handleWeightChange(name, val){
    const {weightsMap} = this.state;
    this.setState({weightsMap: {...weightsMap, [name]: val }}, this.setTotal)
  }
  submit(e){
    e.preventDefault();
    console.log(e)
  }
  render(){
    const {active, activityType, fields, classes, house} = this.props;
    const {weightsMap, selecteds, total} = this.state;
    return (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={active}
          onClose={this.props.reset}
          onEscapeKeyDown={this.props.reset}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={active}>
            <Paper className={classes.container}>
              <h2 id="transition-modal-title" style={{margin: 'auto', color: 'white', marginTop: '.5rem', marginBottom: '.4rem'}}>
                Add New Activity
              </h2>
              <Paper className={classes.formContainer}>
                <form onSubmit={this.submit} style={{display: 'grid', height: 'fit-content'}}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="activityType-label">Activity Type</InputLabel>
                    <Select required
                      labelId="activityType-label"
                      id="activityType"
                      name='activityType'
                      // defaultValue={activityType}
                      onChange={this.handleChange}
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
                      min="1"
                      step="1"
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
                    <ExpansionPanel className={classes.expansionPanel}
                      disabled={selecteds.length ===0}
                      onChange={this.handleExpansionChange}
                      TransitionProps={{ unmountOnExit: true }} >
                      <ExpansionPanelSummary
                        className={classes.expansionSummary}
                        expandIcon={<ExpandMore size='small'/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="subtitle2" className={classes.heading}>{selecteds.length===0?'Please select engaged people.':'Splitting equally.'}</Typography>
                      </ExpansionPanelSummary>

                      <ExpansionPanelDetails className={classes.expansionDetail}>
                        <div style={{display: 'grid', }}>
                          {selecteds.map((name, i) => {
                            return <Grid container style={{width: '17rem', paddingLeft: '3px', paddingRight: '3px', marginRight: '.4rem'}}>
                              <Grid item xs={9}>
                                <Typography id={`input-slider-${name}`} gutterBottom>
                                  {name}
                                </Typography>
                                <Slider
                                  key={`weights-slider-${i}`}
                                  value={weightsMap[name]}
                                  onChangeCommitted={(e,val) => this.handleWeightChange(name, val)}
                                  aria-labelledby={`input-slider-${name}`}
                                />
                              </Grid>
                              <Grid item xs={3} style={{display: 'flex'}}>
                                <Typography className={classes.weightPercent} >
                                  {parseInt(weightsMap[name]/(total))}%
                                </Typography>
                              </Grid>
                            </Grid>
                          })}
                        </div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </FormControl>

                  <FormControl className={classes.formControl}>

                  </FormControl>

                </form>

              </Paper>
            </Paper>
          </Fade>
        </Modal>
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
    updateFields: (fields) => dispatch(updateFields(fields)),
    reset: () => dispatch(reset()),
    submitActivity: (activityType, fields) => dispatch(submitActivity(activityType, fields))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewActivity));
