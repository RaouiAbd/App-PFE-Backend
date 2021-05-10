import './App.css';
import React, {useEffect, useState} from "react";
import Feed from "./Feed";
import requests from "./Requests";
import Login from "./Login";
import Footer from "./Footer";
import Nav from "./Nav";
import {useSelector} from "react-redux";
import {selectUser} from "./userSlice";
import Dashboard from "./Dashboard";
import CreatePoste from "./CreatePoste";
import {BrowserRouter} from "react-router-dom";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Route";
import Loading from "./Loading";
import Chat from "./Chat";


function App() {
    const user = useSelector(selectUser);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        }, 8000);
    }, [])
      if(user){
          return (
              <BrowserRouter>
                  <div className="app">
                          <Switch>
                              <Route path="/" exact>
                                  <div className="app">
                                      <Nav/>
                                      <div className="app_wrapper">
                                          <Feed postUrl={requests.postUrl}
                                                allGroupsUrl={requests.allGroupsUrl}
                                                postsByGroup={requests.postsByGroup}
                                          />
                                      </div>
                                      <Footer/>
                                  </div>
                              </Route>
                              <Route path="/chat">
                                  <div className="app">
                                      <Nav/>
                                      <div className="app_wrapper">
                                          <Chat/>
                                      </div>
                                      <Footer/>
                                  </div>
                              </Route>
                              <Route path="/new-post">
                                  <div className="app">
                                      <Nav/>
                                      <div className="app_wrapper">
                                          <CreatePoste postWithFileUrl={requests.postWithFileUrl}
                                                       postWithoutFileUrl={requests.postWithoutFileUrl}
                                                       allGroupsUrl={requests.allGroupsUrl}
                                          />
                                      </div>
                                      <Footer/>
                                  </div>
                              </Route>
                              <Route path="/notifications">
                                  <div className="app">
                                      <div className="app_wrapper">
                                          <Nav/>
                                          {/*<ServerNotifications notificationUrl={requests.notificationUrl}/>*/}
                                      </div>
                                      <Footer/>
                                  </div>
                              </Route>
                              <Route path="/dashboard">
                                  <Dashboard/>
                              </Route>
                          </Switch>
                  </div>
              </BrowserRouter>
          );
      }
      else{
          return (
              loading ? <Loading/> : <Login loginUrl={requests.loginUrl} userUrl={requests.userUrl}/>
          );

      }
}

export default App;
