import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/navbar'

const Layout: React.FC = () => { 
    return (
        <div>
            <div>
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout    