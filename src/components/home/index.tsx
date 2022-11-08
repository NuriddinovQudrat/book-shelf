import './home.css'
import Navbar from '../navbar/index'
import Sidebar from '../sidebar/index'
import Layout from '../layout/index'

const Home = () => {
    return (
        <div className='home-component'>
            <div className='for-header'>
                <Navbar />
            </div>
            <div className='for-sidebar'>
                <Sidebar />
            </div>
            <div className='for-layout'>
                <Layout />
            </div>
        </div>
    )
}

export default Home