import React, {Component} from "react";
import { Icon } from "react-icons-kit";
import {circle_plus, circle_right} from "react-icons-kit/ikons";
import classes from "./Home.module.css";
import Modal from "../../Components/UI/Modal/Modal";
import WorkoutSelector from "../WorkoutSelector/WorkoutSelector";
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index.js";
import SelectedExercisesTable from "../../Components/SelectedExercisesTable/SelectedExercisesTable";
import SelectedExerciseRow from "../../Components/SelectedExercisesTable/SelectedExerciseRow/SelectedExerciseRow";
import firebase from "../../fire.js";



class Home extends Component{

	componentDidMount(){
		console.log("[home cdm]");

		this.props.fetchCurrentWorkout(this.props.userId, this);
		this.props.fetchWorkoutHistory(this.props.userId)
	
	}


	state={

		

	}

	
redirectHandler = () =>{


		if(this.props.currentWorkout){

		this.props.history.push("/workout");


	} else{

		this.newWorkoutStart();
		this.props.history.push("/workout");

	}

	
}





newWorkoutStart = () =>{
		let token = this.props.token;
		let date = new Date();
		let currentDate = {
			month:date.getMonth() + 1,
			date:date.getDate(),
			year:date.getFullYear(),
			timestamp:date.getTime()
		}

		
		
			
		
		const itemsRef = firebase.database().ref("currentWorkouts");
		
		console.log(itemsRef);                    

		const data = {
			userId: this.props.userId,
			workout:"",
			notes:"",
			date:currentDate,
			
			


		}


		itemsRef.push(data);


		

	}


render(){


	let workout = "To Start a New Workout";
	
	if(this.props.inProgress){

		workout = "Proceed to Workout in Progress";


	}

	let currentWorkout = null;


	if(this.props.currentWorkout){

		const exerciseList = Object.keys(this.props.currentWorkout.workout).map(item=>{

						
					let indExercise = this.props.currentWorkout.workout[item];

			return <SelectedExerciseRow key={indExercise.exerciseID} id={indExercise.exerciseID} exercise={indExercise.exercise} weight={indExercise.weight} sets={indExercise.numberOfSets} reps={indExercise.numberOfReps}   />

			});


		 currentWorkout = (
		 				<SelectedExercisesTable title="Ongoing Workout" >
								
							

							{exerciseList}


		 					

						</SelectedExercisesTable>)

	}

	if(this.props.workoutHistory && this.props.currentWorkout===null){


			const mostRecent = this.props.workoutHistory[0];
		let exList = Object.keys(mostRecent.workout).map(item=>{

			let exercise=mostRecent.workout[item]

			return <SelectedExerciseRow key={exercise.exerciseID} id={exercise.exerciseID} exercise={exercise.exercise} weight={exercise.weight} sets={exercise.numberOfSets} reps={exercise.numberOfReps}   />


		});


		currentWorkout =(

					<SelectedExercisesTable title="Most Recent Workout">
								
							

							{exList}


		 					

						</SelectedExercisesTable>)



			



	}



	console.log(this.props.workoutHistory);


	

	return(

			<div className={classes.Home}>
						
				
				<div className={classes.buttonContainer} style={{color:"#1E73BB"}}>
					
					<Icon onClick={this.redirectHandler} size={200} icon={this.props.inProgress ? circle_right : circle_plus}/>
					<p>Tap Button {workout}</p>

				</div>


				<div className={classes.onGoingWorkoutContainer}>

					{currentWorkout}
					
				</div>


					
			</div>

		)
}


}


const mapStateToProps = state =>{

	return{
		isAuthenticated: state.auth.token,
		userId: state.auth.userId,
		redirectRoute: state.auth.authRedirectPath,
		inProgress:state.workout.inProgress,
		currentWorkout:state.workout.currentWorkout,
		workoutHistory:state.workout.workoutHistory
	}


}

const mapDispatchToProps = dispatch =>{
	return{
		fetchCurrentWorkout:(userId, aaa)=>{dispatch(actions.fetchCurrentWorkout(userId, aaa))},
		fetchWorkoutHistory:(userId)=>{dispatch(actions.fetchWorkoutHistory(userId))}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));