import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Pages
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Signup from './pages/Signup'

// Components
import 'materialize-css/dist/css/materialize.min.css';
import NavBar from "./components/NavBar"

// Utils
import API from './utils/API'





//--------ADDED CODED---------------------

class App extends Component {
  state = {
    isLoggedin: false,
    user_id: '',
    firstName: ''

  }

  async componentDidMount() {
    await API.getUser()
      .then(user => {
        console.log(user);
        this.setState({
          isLoggedin: user.data.isLoggedin,
          user_id: user.data.id,
          firstName: user.data.firstName

        })
      })
  }

  logout() {
    API.logout()
      .then(res => {
        console.log("We logged out")

        window.location = "/"

      })
  }

  render() {

    if (this.state.isLoggedin === false) {
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            {/* <Route exact path="/" component={UnsplashApiSlider} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />

          </Switch>
          {/* <BackgroundSlideshow images={[image1, image2, image3]} /> */}
        </Router>
      )
    } else {
      return (
        <Router>
          <NavBar firstName={this.state.firstName} logout={this.logout} />
          <Switch>
            <Route exact path="/" component={() => <Feed firstName={this.state.firstName} user_id={this.state.user_id} />} />
            <Route exact path="/discover" component={() => <Discover firstName={this.state.firstName} user_id={this.state.user_id} />} />
            <Route exact path="/profile" component={() => <Profile firstName={this.state.firstName} user_id={this.state.user_id} />} />

            {/* // () => <Feed */}
            {/* // email={this.state.email}
                // />
              // }

            /> */}
          </Switch>
          {/* <Footer/> */}
          {/* <BackgroundSlider images={[image4, image5, image6, image7, image8, image9, image10, image11]} duration={5} transition={2}/> */}
        </Router>

      )
    }

  }

};



//-----------END ADD---------------------

export default App;
