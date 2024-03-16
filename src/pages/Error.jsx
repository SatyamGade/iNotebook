import React from 'react'
import {Link} from 'react-router-dom'
 
const Error = () => {
  return (
    <div className='container errDiv'>
      <span className='err404'>404</span>
      <p className='errText'>Page Not Found</p>
      <button><Link className='errLink' to={"/"}>Back to Home Page</Link></button>
    </div>
  )
}

export default Error
