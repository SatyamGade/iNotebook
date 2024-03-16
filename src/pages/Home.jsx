import React, { useContext, useEffect, useState } from 'react'
import Card from '../components/Card';
import "../styles/home.css";
import { JWTContext } from '../contexts/JwtProvider';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

const URL = "http://localhost:5000/api/note";

const Home = () => {

  const { authToken } = useContext(JWTContext);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getNotes = async () => {
    try {
      setIsLoading(false);
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: authToken
        }
      })

      const resData = await response.json();

      if (response.ok) {
        setNotes(resData.data);
        setIsLoading(true);
      } else {
        console.log("error while fetching getAllNotes")
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(URL + `/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authToken
        }
      })

      const resData = await response.json();
      if (response.ok) {
        toast.success(resData.message);
        getNotes();
      } else {
        console.log("Error while deleting note");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleMarkAsDone = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(URL + `/markasdone/${id}`, {
        method: "PUT",
        headers: {
          Authorization: authToken
        }
      })
      
      await response.json();
      if(response.ok){
        e.target.checked = false;
        toast.success("Note mark as Done!");
        getNotes();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNotes();
  }, [])

  return (
    <main className="container homeMain">
      <section>
        {
          notes.length > 0
            ?
            <div className='cardsDiv'>
              {
                notes.map((note, index) => {
                  return <Card
                    key={index}
                    title={note.title}
                    description={note.description}
                    id={note._id}
                    handleDelete={handleDelete}
                    handleMarkAsDone={handleMarkAsDone}
                  />
                })
              }
            </div>
            :
            isLoading &&
            <div className='noCardsDiv'>
              <p className='text'>Notes are not available</p>
              <button><Link className='link' to={'/newnote'}>Add new note</Link></button>
            </div>
        }
      </section>
    </main>
  )
}

export default Home
