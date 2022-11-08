import React, { useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../../redux/actions/loginAction'
import { RootState } from '../../redux/store'
import './navbar.css'

const Navbar = () => {

    const dispatch = useDispatch()
    const [ menu, setMenu ] = useState(false)
    const { name } = useSelector((state: RootState) => state.user.auth)

    const logout = () => {
        dispatch(userLogout())
    }

    return (
        <div className='header-component'>
            <Link to='/'>
                LOGO
            </Link>
            <div className='user-wrapper' onClick={() => setMenu(!menu)}>
                <div className='bg'></div>
                <h5>{name}</h5>
                <MdKeyboardArrowDown className={menu ? 'icon icon-false' : 'icon'} />
                <div className={menu ? 'menu' : 'menu menu-false'}>
                    <Link to='/edit'>
                        <h6>Tahrirlash</h6>
                    </Link>
                    <h6 onClick={logout}>Chiqish</h6>
                </div>
            </div>
        </div>
    )
}

export default Navbar