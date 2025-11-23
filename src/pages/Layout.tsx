import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => { 
    return (
        <div>
            <h1>Layout Page</h1>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout    