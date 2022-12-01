import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Register = () => {

  const [signUpForm, setState] = useState({
      name: "",
      email: "",
      password: ""
    });

  const navigate = useNavigate()
  
  const updateSignUpField = (e: React.ChangeEvent<HTMLInputElement>) => {
  setState({
      ...signUpForm,
      [e.target.name]: e.target.value
  });
  };

  function handleCreateAccount(e: React.FormEvent) {
      e.preventDefault();
      fetch('http://localhost:3000/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({
          name: signUpForm.name,
          email: signUpForm.email,
          password: signUpForm.password
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
  }

  function handleChangePage(){
    navigate("/")
  }

  return (
    <div className="form-container">
        <form onSubmit={handleCreateAccount}>
          <label className="input-field" htmlFor="name">Name
            <input
              id="name"
              value={signUpForm.name}
              name="name"
              onChange={updateSignUpField}

            />
          </label>

          <label className="input-field" htmlFor="email">Email address
            <input
              id="email"
              value={signUpForm.email}
              name="email"
              onChange={updateSignUpField}
            />
          </label>

          <label className="input-field" htmlFor="password">Password
            <input
              id="password"
              value={signUpForm.password}
              name="password"
              onChange={updateSignUpField}
              type="password"
            />
          </label>

          <button>Sign Up</button>
        </form>
        <label className='signup'>Already have an account? <i onClick={handleChangePage} style={{cursor: "pointer"}}>Sign In</i></label>
    </div>
  )
}

export default Register;