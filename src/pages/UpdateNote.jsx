import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { JWTContext } from '../contexts/JwtProvider';
import { toast } from 'react-toastify'


const UpdateNote = () => {

  const navigate = useNavigate();
  const { authToken } = useContext(JWTContext);

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

  const getNote = async () =>{
    try {
      const id = localStorage.getItem("noteId");
      const response = await fetch(`https://i-notebook-backend-weld.vercel.app/api/note/getnote/${id}`,{
        method: "GET",
        headers:{
          Authorization: authToken
        }
      })

      const resData = await response.json();
      if(response.ok){
        setNote({
          title: resData.title,
          description: resData.description
        })
      }else{
        console.log("error while get note in frontend");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const id = localStorage.getItem("noteId");
      const response = await fetch(`https://i-notebook-backend-weld.vercel.app/api/note/updatenote/${id}`,{
        method: "PUT",
        headers:{
          Authorization: authToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
      })

      const resData = await response.json();
      if(response.ok){
        setNote({
          title: "",
          description: ""
        })
        toast.success("Note Updated!");
        localStorage.removeItem("noteId");
        navigate("/");
      }else{
        toast.error(resData.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/");
  }

  useEffect(()=>{
    getNote();
  },[])

  return (
    <div className='container formContainer'>
      <form onSubmit={handleSubmit} className='mainForm'>
        <h1 className='formHeading'>Update Note</h1>
        <input className='formInput' type="text" placeholder='Enter title here' name='title' id='title' value={note.title} onChange={handleChange} />
        <textarea className='formInput' type="text" placeholder='Enter description here' name='description' id='description' value={note.description} onChange={handleChange} />
        <button className='formFirstBtn' type='submit'>Update Note</button>
        <button className='formSecondBtn' onClick={handleClick}>Cancel</button>
      </form>
    </div>
  )
}

export default UpdateNote;
