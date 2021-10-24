import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import About from './components/About';
import Users from './components/Users';
import Search from './components/search';
import UserDetail from './components/userDetail';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';


function App() {

  const [users,setUsers]=useState([]);
  const [user,setUser]=useState({}); 
  const [repos,setRepos]=useState([])


    const searchName = async(text)=> {
      const res = await axios.get(`https://api.github.com/search/users?q=${text}`)
      setUsers(res.data.items);   
  }

  const clearUsers = ()=> {
    setUsers([])
  }

  // to get details of individual user
  const getDetails = async(login)=> {
    const res = await axios.get(`https://api.github.com/users/${login}`)
    setUser(res.data)
  }

  const getRepo = async(username)=> {
      const res= await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=asc`)
      setRepos(res.data)
  }
  return (
    <Router>
      <Navbar/>
      <div className="container">
        <Switch>
        <Route exact path="/" render={
          props=> (
            <>
            <Search searchName={searchName} showClear={users.length > 0 ? true : false} clearUsers={clearUsers} />
            <Users users={users}/>
            </>
          )
          
        }
        />
        
        <Route exact path="/about" component={About}/>
        <Route exact path="/user/:anything" render = {
            props=> (
              <UserDetail getDetails={getDetails} user={user} {...props} getRepo={getRepo} repos={repos}/>
             )
        }
        />
        </Switch>
      </div>
    </Router>
    
  )
}

export default App;
