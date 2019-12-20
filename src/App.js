import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { AuthContext } from './context/Auth';
import { PrivateRoute } from './routes/PrivateRoute';
import app from './config/firebaseConfig';


import Menu from './components/Menu/Menu';
// import AddNewWordForm from './components/AddNewWordForm/AddNewWordForm';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
// import LearnModal from './components/LearnModal/LearnModal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggingInfo: null,
      signUpTypingInfo: null,
      authenticated: false,
      currentUser: null,
      appLoading: true
    };
  }

  setTokens = (data) => {
    data
      ? localStorage.setItem("tokens", data)
      : localStorage.setItem("tokens", "")
  }

  setLoggingInfo = (loggingInfo) => {
    this.setState({ loggingInfo });
  }

  setSignUpTypingInfo = (signUpTypingInfo) => {
    this.setState({ signUpTypingInfo });
  }

  updateAuthState = () => {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          appLoading: false
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          appLoading: false
        });
      }
    });
  }

  componentWillMount() {
    this.updateAuthState();
  }

  render() {
    const { loggingInfo, signUpTypingInfo, authenticated, currentUser, appLoading } = this.state;
    if (appLoading) { return <div className="loading-screen"></div> };
    return (
      <AuthContext.Provider value={{
        setAuthTokens: this.setTokens,
        setLoggingInfo: this.setLoggingInfo,
        loggingInfo,
        setSignUpTypingInfo: this.setSignUpTypingInfo,
        signUpTypingInfo,
        authenticated,
        currentUser,
        appLoading,
        updateAuthState: this.updateAuthState
      }}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/sign-up" component={SignUpForm} />
              <PrivateRoute path="/index.html" authenticated exact component={Menu} />
              {/* <PrivateRoute path="/add-new-word" component={AddNewWordForm} />
              <PrivateRoute path="/learn" component={LearnModal} /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

export default App;
