import { React, useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { JWTContext } from '../contexts/JwtProvider';

const URL = "https://i-notebook-backend-weld.vercel.app/api/auth/login";

const Login = () => {

    const navigate = useNavigate();

    const { setJwtTokenToLS } = useContext(JWTContext);

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userInfo)
            })
            const resData = await response.json();

            if (response.ok) {
                setUserInfo({
                    email: "",
                    password: ""
                })
                navigate("/");
                toast.success(resData.message);
                setJwtTokenToLS(resData.token);
            } else {
                toast.error(resData.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (e)=>{
        e.preventDefault();
        navigate("/register");
    }

    return (
        <div className='container formContainer'>
            <form onSubmit={handleSubmit} className='mainForm'>
                <h1 className='formHeading'>Login</h1>
                <input required className='formInput' type="email" placeholder='Email' name='email' id='email' value={userInfo.email} onChange={handleChange} />
                <input required className='formInput' type="password" placeholder='Password' name='password' id='password' value={userInfo.password} onChange={handleChange} />
                <button type='submit' className='formFirstBtn'>Sign In</button>
                <button onClick={handleClick} className='formSecondBtn'>Create Account</button>
            </form>
        </div>
    )
}

export default Login
