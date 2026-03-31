import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase'
import '../App.css'
import '../css/login.css'

function Login() {

  const [inputfields, setInputfields] = useState({ email: "", password: "" })

  const handleOnChange = (e, key) => {
    setInputfields({
      ...inputfields, [key]: e.target.value
    })
  }


  const handlelogin = async () => {
    try {
      const userLogin = await signInWithEmailAndPassword(auth,inputfields.email,inputfields.password);
      localStorage.setItem("user", JSON.stringify(userLogin.user));
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.message);
    }
  };
  
  return (
    <>
    <div className='login'>
      <form >
        <h4>Admin login</h4>
        <label htmlFor='email'>Email:</label>
        <input value={inputfields.email} onChange={(e) => handleOnChange(e, 'email')} placeholder='Enter  Email..' className='input1' />
        <br />
        <label htmlFor='password'>Password:</label>
        <input value={inputfields.password} onChange={(e) => handleOnChange(e, 'password')} placeholder='Enter Password..' type='password' className='input1'/>
        <br />
      </form>
      <button onClick={handlelogin} className='login-button'>Login</button>
    </div>

    </>
  )
}

export default Login;


