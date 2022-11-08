import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { userLogin } from '../../redux/actions/loginAction'
import './login.css'

const Login = () => {

    const dispatch = useDispatch()

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ key, setKey ] = useState('')
    const [ secret, setSecret ] = useState('')

    const submitForm = (e: any) => {
        e.preventDefault()
        const data = {
            name,
            email,
            key,
            secret
        }
        axios.post('https://no23v104.herokuapp.com/signup', data).then(res => {
            toast.success(res.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            dispatch(userLogin(res.data.data))
        }).catch(err => {
            toast.error("Error!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })

    }

    return (
        <div className='login-component'>
            <form className='wrapper' onSubmit={submitForm}>
                <input type='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type='text' placeholder='Key' value={key} onChange={(e) => setKey(e.target.value)} required />
                <input type='text' placeholder='Secret' value={secret} onChange={(e) => setSecret(e.target.value)} required />
                <button type='submit'>Kirish</button>
            </form>
        </div>
    )
}

export default Login