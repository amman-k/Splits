import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const {user,loading}=useContext(AuthContext);
    
    if(loading){
        return(
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
        )
    }
    return user?<Outlet/>:<Navigate to='/login'/>
}

export default PrivateRoute