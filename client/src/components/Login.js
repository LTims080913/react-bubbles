import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialState = {
  username: '',
  password: '',
  isFetching: false
}

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [login, setLogin] = useState(initialState)
  const handleChange = e => {
    setLogin({...login, [e.target.name]: e.target.value})
  }
  const handleSubmit = e => {
    e.preventDefault()
    setLogin({...login, isFetching: true})
    axiosWithAuth()
    .post('/api/login', login)
    .then(res => {
      console.log({res})
      localStorage.setItem('token', res.data.payload)
      props.history.push('/bubbles')
    })
    .catch(error => {
      console.log('Your bubble has been burst', error)
    })
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <h3>Login</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            label="Username"
            type="text"
            name="username"
            placeholder="username"
            value={login.username}
            onChange={handleChange}
          />
          <br />
          <input
            label="Password"
            type="password"
            name="password"
            placeholder="password"
            value={login.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <button>Log In</button>
          {login.isFetching && "Please wait...logging you in"}
        </form>
      </div>
      
    </>
  );
};

export default Login;
