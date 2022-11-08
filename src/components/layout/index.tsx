import { Route, Routes } from 'react-router-dom'
import Books from '../../pages/books'
import './layout.css'

const Layout = () => {
    return (
        <div className='layout-component'>
            <Routes>
                <Route path='/' element={<Books />} />
            </Routes>
        </div>
    )
}

export default Layout