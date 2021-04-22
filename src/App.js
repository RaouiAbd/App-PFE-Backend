import './App.css';
import React from "react";
import Feed from "./Feed";
import requests from "./Requests";
import Login from "./Login";
import Footer from "./Footer";
import Nav from "./Nav";
import Register from "./Register";
import {useSelector} from "react-redux";
import {selectUser} from "./userSlice";
import Dashboard from "./Dashboard";
import CreatePoste from "./CreatePoste";
import {BrowserRouter} from "react-router-dom";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Route"


function App() {
    const user = useSelector(selectUser);

      if(user){
          return (
              <BrowserRouter>
                  <div className="app">
                          <Switch>
                              <Route path="/feed">
                                  <div className="app">
                                      <Nav/>
                                      <div className="app_wrapper">
                                          <Feed postUrl={requests.postUrl}/>
                                      </div>
                                      <Footer/>
                                  </div>
                              </Route>
                              <Route path="/new-post">
                                  <div className="app">
                                      <Nav/>
                                      <div className="app_wrapper">
                                          <CreatePoste postWithFileUrl={requests.postWithFileUrl}
                                                       postWithoutFileUrl={requests.postWithoutFileUrl}/>
                                      </div>
                                      <Footer/>
                                  </div>
                              </Route>
                              <Route path="/dashboard">
                                  <Dashboard/>
                              </Route>
                              <Route path="/login">
                                  <Login loginUrl={requests.loginUrl} userUrl={requests.userUrl}/>
                              </Route>
                              <Route path="/register">
                                  <Register registerUrl={requests.registerUrl}/>
                              </Route>
                          </Switch>
                  </div>
              </BrowserRouter>
          );
      }else{
          return(
              <Login loginUrl={requests.loginUrl} userUrl={requests.userUrl}/>
          );
      }
}

export default App;
