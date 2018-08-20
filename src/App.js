import React, { Component } from 'react';

import './App.css';
import { BrowserRouter, Route, NavLink, Link, Switch, withRouter, Redirect } from "react-router-dom";
import Auth from "./Containers/Auth/Auth";
import Layout from "./HOC/Layout/Layout";
import Logout from "./Containers/Auth/Logout/Logout";
import Home from "./Containers/Home/Home";
import WorkoutSelector from "./Containers/WorkoutSelector/WorkoutSelector";
import Workout from "./Containers/Workout/Workout";
import History from "./Containers/History/History";
import { connect } from "react-redux";
import * as actions from "./store/actions/index.js";




class App extends Component {

  componentWillMount(){
 
   console.log("[app cwm]")
   this.props.onTryAutoSignUp();

  }



  componentDidMount(){
    console.log("[app cdm] " );
   
    
    
  }


  render() {
    
  
let routes =  <Switch>
              
                  <Route exact path="/"   component={Auth} />
                  
              </Switch>

if(this.props.isAuthenticated){

   routes= <Switch>
          
              <Route path="/logout" component={Logout} />
              <Route path="/home" component={Home} />
              <Route path="/history" component={History} />
              <Route path="/workoutSelector" component={WorkoutSelector} />
              <Route exact path="/workout" component={Workout} />

              <Route exact path="/"   component={Auth} />
          
           </Switch>


}
    
console.log(routes);


    return (

      <Layout>
        <div>
          
         {routes}

        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state =>{

  return {

    isAuthenticated: state.auth.token,
    refreshPath: state.auth.refreshPath

  }

}

const mapDispatchToProps = dispatch =>{

  return {

    onTryAutoSignUp: () => dispatch(actions.AuthCheckState()),
    setRefreshPath: (val) => dispatch(actions.setRefreshPath(val))


  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
