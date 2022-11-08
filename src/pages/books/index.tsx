import { useEffect, useRef, useState } from 'react'
import { Modal } from 'antd'
import { Row, Col } from 'react-bootstrap'
import { MdDelete, MdEdit } from 'react-icons/md'
import { GrAdd } from 'react-icons/gr'
import md5 from 'md5'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './books.css'
import { RootState } from '../../redux/store'

const Books = () => {
    
    const { key, secret } = useSelector((state: RootState) => state.user.auth)

    const fileRef = useRef<HTMLInputElement>(null)

    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ title, setTitle ] = useState('')
    const [ author, setAuthor ] = useState('')
    const [ published, setPublished ] = useState('')
    const [ pages, setPages ] = useState('')
    const [ imageFileUrl, setImageFileUrl ] = useState<string>("")

    const getUrl = () => {
        if(fileRef.current?.files?.length) {
            setImageFileUrl(URL.createObjectURL(fileRef.current.files[0]))
        }
    }

    const addBook = (e: any) => {
        e.preventDefault()
        const book = {
            title,
            author,
            published: Number(published),
            pages: Number(pages),
            cover: fileRef.current?.files ? fileRef.current?.files[0] : fileRef.current?.files,
            isbn: "9781118464465"
        }
        axios.post('https://no23v104.herokuapp.com/books', book, {
            headers: {
                "Key": key,
                "Sign": md5(`POSThttps://no23v104.herokuapp.com/books{isbn:"9781118464465"}${secret}`)
            }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const getAllBooks = () => {
        axios.get('https://no23v104.herokuapp.com/books', {
            headers: {
                "Key": key,
                "Sign": md5(`POSThttps://no23v104.herokuapp.com/books{isbn:"9781118464465"}${secret}`),
                'Access-Control-Allow-Origin': '*'
            }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllBooks()
    }, [])

    return (
        <div className='books-page'>
            <Modal 
                title={null} 
                open={isModalOpen} 
                onOk={() => setIsModalOpen(false)} 
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                className='antd-modals'
                closeIcon={null}
            >
                <form encType='multipart/form-data' onSubmit={addBook}>
                    <div className='bg' style={{backgroundImage: `url(${imageFileUrl})`}}>
                        <GrAdd className={fileRef.current !== null ? 'icon icon-none' : 'icon'} />
                        <input type='file' ref={fileRef} required onChange={() => getUrl()} />
                    </div>
                    <div className='label-input'>
                        <label>Title</label>
                        <input type='text' placeholder='Title' required value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='label-input'>
                        <label>Author</label>
                        <input type='text' placeholder='Author' required value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                    <div className='label-input'>
                        <label>Published</label>
                        <input type='number' placeholder='' required value={published} onChange={(e) => setPublished(e.target.value)} />
                    </div>
                    <div className='label-input'>
                        <label>Pages</label>
                        <input type='number' placeholder='' required value={pages} onChange={(e) => setPages(e.target.value)} />
                    </div>
                    <button className='add-btn'>Add book</button>
                </form>
            </Modal>

            <div className='top'>
                <div></div>
                <button onClick={() => setIsModalOpen(true)}>Add book</button>
            </div>
            <Row>
                <Col lg={3} md={4}>
                    <div className='book'>
                        <h1>Title</h1>
                        <div>
                            <p>Author</p>
                            <span>2021</span>
                        </div>
                        <div className='wrapper'>
                            <div className='edit'>
                                <MdEdit className='icon' />
                            </div>
                            <div className='delete'>
                                <MdDelete className='icon' />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Books