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
import {MyGroups} from "./group/MyGroups";
import {selectGroup} from "./context/groupSlice";
import {ComponentWhenNothingSelected} from "./workspace/ComponentWhenNothingSelected";


function App() {

    const user = useSelector(selectUser);
    const selectedGroup = useSelector(selectGroup);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        }, 3000);
    }, []);

      if(user){
          return (
              <BrowserRouter>
                  <div className="app">
                          <Switch>
                              <Route path="/" exact>
                                  <div className="app">
                                      <Nav/>
                                      <div className="app_wrapper">
                                          {
                                              selectedGroup ?
                                                  <Feed postsByGroup={requests.postsByGroup}/> :
                                                  <ComponentWhenNothingSelected name={"Group"}/>
                                          }
                                      </div>
                                      <Footer/>
                                  </div>
                              </Route>
                              <Route path="/workspace">
                                  <div className="app">
                                      <Nav/>
                                      <div className="app_wrapper">
                                          {
                                              selectedGroup ?
                                                  <Workspace/> :
                                                  <ComponentWhenNothingSelected name={"Workspace"}/>
                                          }
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
