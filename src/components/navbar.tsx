import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const navbar = () => {
    const user = {name : 'Tanvi Kamath'} 
    const navigate = useNavigate();
    const logoutUser = () => {
        navigate('/');
    }
  return (
    <div className="w-full bg-white shadow-md">
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3 text-slate-800 transition duration-500'>
            <Link to="/">
                <img src="logo.svg" alt="" />
            </Link>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 rounded-full px-3 py-1">
                    <span className="text-sm">Hi,</span>
                    <span className="font-medium text-sm">{user.name}</span>
                </div>

                <button
                    onClick={logoutUser}
                    className="ml-2 inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 border border-red-100 rounded-full hover:bg-red-100 transition"
                    aria-label="Logout"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    <span className="text-sm">Logout</span>
                </button>
            </div>
        </nav> 
    </div>
  )
}

export default navbar