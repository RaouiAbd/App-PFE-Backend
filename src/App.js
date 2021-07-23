import './App.css';
import React, {useEffect, useState} from "react";
import Feed from "./feed/Feed";
import requests from "./shared/Requests";
import Login from "./user/Login";
import Footer from "./shared/Footer";
import Nav from "./shared/Nav";
import {useSelector} from "react-redux";
import {selectUser} from "./context/userSlice";
import Dashboard from "./dashboard/Dashboard";
import CreatePoste from "./post/CreatePoste";
import {BrowserRouter} from "react-router-dom";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Route";
import Loading from "./shared/Loading";
import Chat from "./chat/Chat";
import {Workspace} from "./workspace/Workspace";


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
                              <Route path="/w">
                                  <div className="app">
                                      <Nav/>
                                      <div className="app_wrapper">
                                          <Workspace/>
                                      </div>
                                      <Footer/>
                                  </div>
                              </Route>
                              <Route path="/chat">
                                  <div className="app">
                                      <div className="app_wrapper">
                                          <Chat/>
                                      </div>
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
                              <Route path="/events">
                                  <div className="app">
                                      <div className="app_wrapper">
                                          <Nav/>

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
