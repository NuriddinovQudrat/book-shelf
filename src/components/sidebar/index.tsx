import { Link } from 'react-router-dom'
import { GiWhiteBook } from 'react-icons/gi'
import './sidebar.css'

const Sidebar = () => {
    return (
        <div className='sidebar-component'>
            <Link to='/'>
                <div className='qator'>
                    <GiWhiteBook className='icon' />
                    <h2>Kitoblar</h2>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar