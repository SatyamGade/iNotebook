import React from 'react'
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import "../styles/card.css";
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
    const { title, description, id, handleDelete, handleMarkAsDone } = props;

    const navigate = useNavigate();

    const handleUpdate = (id)=>{
        localStorage.setItem("noteId", id);
        navigate("/updatenote");
    }

    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <div className="cardHandlers">
                    <div>
                        <label htmlFor="markAsDone"></label>
                        <input type="checkbox" name="markAsDone" id="markAsDone" onChange={(e)=>handleMarkAsDone(e,id)}/> Mark as Done
                    </div>
                    <div className='btnsContainer'>
                        <button onClick={()=> handleUpdate(id)} title="Edit Note"><FaEdit /></button>
                        <button onClick={()=> handleDelete(id)} title="Delete Note"><FaTrash /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
