import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { JWTContext } from '../contexts/JwtProvider';

const URL = "http://localhost:5000/api/auth/register";

const Register = () => {

  const navigate = useNavigate();

  const {setJwtTokenToLS} = useContext(JWTContext);

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
  })

  const handleChange = (e) =>{
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(userInfo)
      })

      const resData = await response.json();
      if(response.ok){
        setUserInfo({
          username: "",
          password: "",
          phone: "",
          email: ""
        })
        toast.success(resData.message);
        setJwtTokenToLS(resData.token);
        navigate("/");
      }else{
        toast.error(resData.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = (e)=>{
    e.preventDefault();
    navigate("/login");
  }

  return (
    <div className='container formContainer'>
      <form className='mainForm' onSubmit={handleSubmit}>
        <h1 className='formHeading'>Register</h1>
        <input required className='formInput' type="text" placeholder='Username' name='username' id='username' value={userInfo.username} onChange={handleChange}/>
        <input required className='formInput' type="email" placeholder='Email' name='email' id='email' value={userInfo.email} onChange={handleChange}/>
        <input required className='formInput' type="password" placeholder='Password' name='password' id='password' value={userInfo.password} onChange={handleChange}/>
        <input required className='formInput' type="number" placeholder='Phone' name='phone' id='phone' value={userInfo.phone} onChange={handleChange}/>
        <button className='formFirstBtn' type='submit'>Register</button>
        <button className='formSecondBtn' onClick={handleClick}>Already have an account</button>
      </form>
    </div>
  )
}

export default Register
