import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { JWTContext } from '../contexts/JwtProvider';
import {toast} from 'react-toastify'

const URL = "https://i-notebook-backend-weld.vercel.app/api/note/newnote";

const NewNote = () => {

    const navigate = useNavigate();
    const {authToken} = useContext(JWTContext);

    const [note, setNote] = useState({
        title: "",
        description: "",
    })

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers:{
                    Authorization: authToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(note)
            })

            const resData = await response.json();

            if(response.ok){
                setNote({
                    title: "", description: ""
                })
                toast.success("New Note Added");
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
        navigate("/");
    }

    return (
        <div className='container formContainer'>
            <form onSubmit={handleSubmit} className='mainForm'>
                <h1 className='formHeading'>New Note</h1>
                <input className='formInput' type="text" placeholder='Enter title here' name='title' id='title' value={note.title} onChange={handleChange} />
                <textarea className='formInput' type="text" placeholder='Enter description here' name='description' id='description' value={note.description} onChange={handleChange} />
                <button className='formFirstBtn' type='submit'>Add to Notes</button>
                <button className='formSecondBtn' onClick={handleClick}>Cancel</button>
            </form>
        </div>
    )
}

export default NewNote
