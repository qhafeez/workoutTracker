import React, { Component } from "react";
import classes from "./ExerciseContainer.module.css";
import SetComponent from "../../Components/SetComponent/SetComponent";
import {connect} from "react-redux";
import firebase from "../../fire.js";


class ExerciseContainer extends Component {




state={

	sets:this.props.sets,
	repsPerSet:this.props.reps,
	exId:this.props.exId,
	path:this.props.path


}


// componentDidUpdate(prevProps, prevState){

// 	if(prevProps.sets !== this.props.sets){

// 			this.setState({

// 				sets:this.props.sets

// 			})

// 	}


// }



// static getDerivedStateFromProps(props, state){

// 	if(props.sets !== this.props.sets){

// 		this.props.sets = props.sets
// 	}

// }



render(){

	let numberOfReps = this.props.reps;
	
		// console.log(typeof(numberOfReps));
	
	let currentExercise = this.props.currentWorkout.workout[this.props.path];
	
		console.log(currentExercise);

	let setComponents = Object.keys(currentExercise.sets).map(set=>{

		// console.log(this.props.sets[set]);
	
		return <SetComponent 
					key={set}
					repsPerSet={currentExercise.numberOfReps} 
					repsCompleted={currentExercise.sets[set]} 
					exId={currentExercise.exId} 
					setId={set} 
					path={this.props.path}
					
					/>



	})

	let setContainerClasses = [classes.setsContainer];

	switch(Number(this.props.numberOfSets)){

		case(1):
			setContainerClasses.push(classes.oneSet);
			break;
		
		case(2):
			setContainerClasses.push(classes.twoSet);
			break;
		
		case(3):
			setContainerClasses.push(classes.threeSet);
			break;
		
		case(4):
			setContainerClasses.push(classes.fourSet);
			break;

		case(5):
			setContainerClasses.push(classes.fiveSet);
			break;


	}



	return(

				<div className={classes.individualExerciseContainer}>
					
							<div className={classes.exerInfoContainer}>
								<div>{this.props.exerciseName}</div>
									<div className={classes.setsWeightContainer}>
										<div className={classes.setsRepsContainer}>{this.props.numberOfSets} x {this.props.reps}</div>
										<div>{this.props.weight} lbs</div>
								</div>
							</div>
							<div className={classes.setSection} >
								<div className={setContainerClasses.join(" ") /*flex-direction row*/}>


											{setComponents}								
									
									
									

								</div>
							</div>
							<div className={classes.removeContainer}>
								
								
							</div>
							
						</div>

		)

}


}

const mapStateToProps = state =>{

	return{

		currentWorkout:state.workout.currentWorkout

	}


}

export default connect(mapStateToProps)(ExerciseContainer);