import * as actionTypes from "./actionTypes";

/*this is a new axios instance.  it is not the one
  from axios-orders.  we are doing this because
  we don't use the baseURL that is set up in that one	
*/
import axios from "axios";
import firebase from '../../fire.js';


export const fetchStart = () =>{

	return{
		type:actionTypes.FETCH_WORKOUT_START
	}

}

export const fetchCurrentSuccess = (workout) =>{

	return{
		type:actionTypes.FETCH_WORKOUT_SUCCESS,
		currentWorkout: workout
	}

}


export const fetchFail = () =>{

	return{
		type:actionTypes.FETCH_WORKOUT_FAIL
	}

}

export const fetchCurrentWorkout = (aaa, comp) =>{

	return dispatch =>{

			dispatch(fetchStart());

			console.log(comp);
			
			const workout = firebase.database().ref("currentWorkouts").orderByChild("userId").equalTo(aaa);
		
		console.log(workout);
		
			let exercises =null;

			workout.on("value", (snapshot) =>{
				//this gets called every times data in the currentworkouts with the current userid  is changed
				//so, when repHandler updates the informatin in the current workout, this gets called, which will dispatch
				//the fetchSuccess action
				console.log("workout.on");

				if(snapshot.exists()){
				
						snapshot.forEach(function(childSnapshot){
							
							let exercises = childSnapshot.val();
							console.log(exercises);
							exercises.key = childSnapshot.ref.getKey();

							 dispatch(fetchCurrentSuccess(exercises));


						})

					} else{


						dispatch(fetchFail());


					}	

	},(error)=>{console.log(error)}) ;


	// 		console.log(firebase.database().ref("currentWorkouts").orderByChild("userId").on("value", (snapshot) =>{
				
	// 				snapshot.forEach(function(childSnapshot){
						
	// 					let exercises = childSnapshot.val();

	// 					 dispatch(fetchSuccess(exercises.workout));


	// 				})	

	// })
	// 		);




	}


}



export const fetchHistorySuccess = (history) =>{

	return {

		type:actionTypes.FETCH_WORKOUT_HISTORY_SUCCESS,
		workoutHistory: history

	}

}


export const fetchWorkoutHistory = (aaa) =>{

	return dispatch =>{

			dispatch(fetchStart());

			
			const workout = firebase.database().ref("completedWorkout").orderByChild("userId").equalTo(aaa);
		
		console.log(workout);
		
			let exercises =null;

			workout.on("value", (snapshot) =>{
				//this gets called every times data in the currentworkouts with the current userid  is changed
				//so, when repHandler updates the informatin in the current workout, this gets called, which will dispatch
				//the fetchSuccess action
				console.log("workout.on");

				if(snapshot.exists()){

					let workoutHistory = [];
				
						snapshot.forEach(function(childSnapshot){
							
							let workout = childSnapshot.val();
							
							workout.key = childSnapshot.ref.getKey();

							workoutHistory.push(workout);
						//to convert to descending order; most recent workout first

							 // dispatch(fetchHistorySuccess(exercises));


						})
						dispatch(fetchHistorySuccess(workoutHistory.reverse()));

					} else{


						// dispatch(fetchFail());


					}	

	},(error)=>{console.log(error)}) ;


	// 		console.log(firebase.database().ref("currentWorkouts").orderByChild("userId").on("value", (snapshot) =>{
				
	// 				snapshot.forEach(function(childSnapshot){
						
	// 					let exercises = childSnapshot.val();

	// 					 dispatch(fetchSuccess(exercises.workout));


	// 				})	

	// })
	// 		);




	}


}


export const completeWorkout = (workoutPath) =>{

	return dispatch => {

	let workout = null
	firebase.database().ref("currentWorkouts/"+workoutPath).on("value", (snapshot)=>{

		workout = snapshot.val();

		firebase.database().ref("completedWorkout").push(workout);

	})

	firebase.database().ref("currentWorkouts/"+workoutPath).remove();

	// console.log(workout);

	

	
	// console.log(this.props.currentWorkout.key);
	}
}


export const addExerciseStart =()=>{

	return{
		type:actionTypes.ADD_EXERCISE_START
	}

}

export const addExerciseSuccess =()=>{

	return{
		type:actionTypes.ADD_EXERCISE_SUCCESS
	}

}

export const addExerciseHandler = (data, path) =>{

	return dispatch =>{

		dispatch(addExerciseStart());

		const itemsRef = firebase.database().ref("currentWorkouts/"+path+"/workout");

		itemsRef.push(data).then(()=>{
			
			dispatch(addExerciseSuccess());

			// this.resetValuesAfterAdd()
		
		});
		
		// this.props.closeModal();


	}


}


export const repHandler = (repObj) =>{

		return dispatch =>{

			console.log("dispatch rephandler");

			firebase.database().ref().update(repObj);

		}


}

export const updateNotes = (notes) =>{

		return dispatch =>{

			console.log("dispatch updateNotes");

			firebase.database().ref().update(notes);

		}


}

export const exerciseModalShow =()=>{
	return{
		type:actionTypes.EXERCISE_MODAL_SHOW
	}
}

export const exerciseModalClose =()=>{
	return{
		type:actionTypes.EXERCISE_MODAL_CLOSE,
		
	}
}

export const notesModalClose =()=>{
	return{
		type:actionTypes.NOTES_MODAL_CLOSE
	}
}

export const notesModalShow =()=>{
	return{
		type:actionTypes.NOTES_MODAL_OPEN
	}
}

