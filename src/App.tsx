import { BrowserRouter } from 'react-router-dom'
import Home from './components/home/index'
import './App.css'
import Login from './pages/login'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { ToastContainer } from "react-toastify";

const App = () => {

  const auth = useSelector((state: RootState) => state.user.auth)

  const authRoutes = (
    <Home />
  )

  const loginRoutes = (
    <Login />
  )

  return (
    <BrowserRouter>
      <ToastContainer />
      {
        auth ? authRoutes : loginRoutes
      }
    </BrowserRouter>
  )
}

export default App