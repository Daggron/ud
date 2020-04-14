import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import NewQuestion from './components/NewQuestion'
import LeaderBoard from './components/LeaderBoard'
import Poll from './components/Poll'
import Error404 from './components/Error404'
import { connect } from 'react-redux'
import { handleInitialData } from './redux/actions/shared';
import Loading from './components/Loading/Loading';
import './App.css';

class App extends Component {
  componentDidMount() {
    const { dispatch, loading } = this.props
    if(loading === true) {
      dispatch(handleInitialData())
   }
  }
  render() {
    const {loading} = this.props;
    if(loading){
      return(
        <Loading />
      )
    }
    return (
    <Router>
        <Navbar/>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/' exact component={Home} />
          <Route path='/add' exact component={NewQuestion} />
          <Route path='/questions/:question_id' exact component={Poll} />
          <Route path='/leaderboard' exact component={LeaderBoard} />
          <Route path="*" component={Error404}/>
        </Switch>
    </Router>
    )
  }
}

function mapStateToProps({users}) {
  return {
    loading: isEmpty(users)
  }
}

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false
  }
  return true
}

export default connect(mapStateToProps)(App)
