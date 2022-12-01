import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [loginForm, setState] = useState({
        email: "",
        password: ""
      });
    
    const navigate = useNavigate()

    const updateSignUpField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
        ...loginForm,
        [e.target.name]: e.target.value
    });
    };
    
    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        fetch('http://localhost:3000/api/user/signin', {
            method: 'POST',
            body: JSON.stringify({
                email: loginForm.email,
                password: loginForm.password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    function handleChangePage() {
        navigate("/register")
    }

  return (
    <div className="form-container">
    <form onSubmit={handleLogin}>
      <label className="input-field" htmlFor="email">Email address
        <input
          id="email"
          value={loginForm.email}
          name="email"
          onChange={updateSignUpField}
        />
      </label>

      <label className="input-field" htmlFor="password">Password
        <input
          id="password"
          value={loginForm.password}
          name="password"
          onChange={updateSignUpField}
          type="password"
        />
      </label>

      <button>Sign In</button>
    </form>
    <label className='signin'>Don't have an account? <i onClick={handleChangePage} style={{cursor: "pointer"}}>Create One</i></label>
</div>
  )
}

export default Login