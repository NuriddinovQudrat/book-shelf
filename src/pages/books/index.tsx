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
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'

const Books = () => {
    
    const { key, secret, id } = useSelector((state: RootState) => state.user.auth)

    const fileRef = useRef<HTMLInputElement>(null)

    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ createLoading, setCreateLoading ] = useState(true)
    const [ createLoading1, setCreateLoading1 ] = useState(true)
    const [ isbn, setIsbn ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ searchTitle, setSearchTitle ] = useState('')
    const [ author, setAuthor ] = useState('')
    const [ published, setPublished ] = useState('')
    const [ pages, setPages ] = useState('')
    const [ allBooks, setAllBooks ] = useState([])
    const [ imageFileUrl, setImageFileUrl ] = useState<string>("")

    const loading = createLoading ? <Loader /> : null

    const getUrl = () => {
        if(fileRef.current?.files?.length) {
            setImageFileUrl(URL.createObjectURL(fileRef.current.files[0]))
        }
    }
    
    const getAllBooks = () => {
        axios.get('https://no23v104.herokuapp.com/books', {
            headers: {
                "Key": key,
                "Sign": md5(`GEThttps://no23v104.herokuapp.com/books${secret}`)
            }
        }).then(res => {
            setAllBooks(res.data.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => setCreateLoading(false))
    }

    const addBook = (e: any) => {
        e.preventDefault()
        setCreateLoading1(false)
        const book = {
            id,
            isbn,
            title,
            author,
            published: Number(published),
            pages: Number(pages),
            cover: fileRef.current?.files ? fileRef.current?.files[0] : fileRef.current?.files
        }
        const signKeyString = `POSThttps://no23v104.herokuapp.com/books${JSON.stringify(book)}${secret}`
        axios.post('https://no23v104.herokuapp.com/books', book, {
            headers: {
                "Key": key,
                "Sign": md5(signKeyString)
            }
        }).then(res => {
            toast.success("Created", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setIsModalOpen(false)
            setImageFileUrl("")
            setIsbn("")
            setTitle('')
            setAuthor('')
            setPublished('')
            setPages('')
            getAllBooks()
        }).catch(err => {
            toast.error("Error", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }).finally(() => setCreateLoading1(true))
    }

    const deleteBook = (id: any) => {
        const signKeyString = `DELETEhttps://no23v104.herokuapp.com/books/${id}${secret}`
        axios.delete(`https://no23v104.herokuapp.com/books/${id}`, {
            headers: {
                "Key": key,
                "Sign": md5(signKeyString)
            }
        }).then(res => {
            toast.success("Deleted", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            getAllBooks()
        }).catch(err => {
            console.log(err)
            toast.error("Error", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }

    const searchBook = () => {
        if (searchTitle.length > 0) {
            axios.get(`https://no23v104.herokuapp.com/books/${searchTitle}`, {
                headers: {
                    "Key": key,
                    "Sign": md5(`GEThttps://no23v104.herokuapp.com/books/${searchTitle}${secret}`)
                }
            }).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    useEffect(() => {
        getAllBooks()
    }, [])

    useEffect(() => {
        searchBook()
    }, [ searchTitle ])

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
                        <label>ISBN</label>
                        <input type='number' placeholder='ISBN' required value={isbn} onChange={(e) => setIsbn(e.target.value)} />
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
                    <button className={!createLoading ? 'add-btn' : 'add-btn add-btn-false'} disabled={!createLoading1}>Add book</button>
                </form>
            </Modal>

            <div className='top'>
                <input type='text' value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} placeholder='Search by title' />
                <button onClick={() => setIsModalOpen(true)}>Add book</button>
            </div>

            {loading}

            <Row>
                {
                    allBooks?.map((item: any, index) => {
                        return (
                            <Col lg={3} md={4} key={index}>
                                <div className='book'>
                                    <h1>{item.book.title ? item.book.title : 'Title'}</h1>
                                    <div>
                                        <p>{item?.book.author}</p>
                                        <span>{item?.book.published}</span>
                                    </div>
                                    <div className='wrapper'>
                                        <div className='edit'>
                                            <MdEdit className='icon' />
                                        </div>
                                        <div className='delete' onClick={() => deleteBook(item?.book.id)}>
                                            <MdDelete className='icon' />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

export default Books