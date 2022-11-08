import React, { useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {

    const [ menu, setMenu ] = useState(false)

    return (
        <div className='header-component'>
            <Link to='/'>
                LOGO
            </Link>
            <div className='user-wrapper' onClick={() => setMenu(!menu)}>
                <div className='bg'></div>
                <h5>Nuriddinov Qudratjon</h5>
                <MdKeyboardArrowDown className={menu ? 'icon icon-false' : 'icon'} />
                <div className={menu ? 'menu' : 'menu menu-false'}>
                    <Link to='/edit'>
                        <h6>Tahrirlash</h6>
                    </Link>
                    <h6>Chiqish</h6>
                </div>
            </div>
        </div>
    )
}

export default Navbar