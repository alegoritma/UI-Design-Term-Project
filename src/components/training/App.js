import React, {Fragment} from 'react';
import './App.css';
import { Header, Footer } from './components/layouts/index';
import Exercises from './components/exercises/index';
import {muscles, exercises} from './store';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises,
      category: ''
    }
    this.getExercisesByMuscles = this.getExercisesByMuscles.bind(this);
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
  }
  getExercisesByMuscles(){
    const {category} = this.state;
    return Object.entries(this.state.exercises.reduce((exercises, exercise) => {
      const {muscles} = exercise;
      exercises[muscles] = (exercises[muscles])?[...exercises[muscles], exercise]:[exercise]
      return exercises
    }, {}));
  }
  handleCategorySelected(category){
    this.setState({category})
  }
  render(){
    const exercises = this.getExercisesByMuscles(), {category} = this.state;
    return <Fragment>
      <Header />

      <Exercises
        exercises={exercises}
        category={category}
      />

      <Footer
        muscles={muscles}
        onSelect={this.handleCategorySelected}
        category={category}
      />
    </Fragment>;
  }
}

export default App;
