import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
const messageTimer = 5000


const BlogForm = ({ user, setMessage }) => {

    const [ title, setTitle ] = useState('')
    const [ author, setAuthor ] = useState('')
    const [ url, setUrl ] = useState('')

    const newBlog = async event => {
        event.preventDefault()
        console.log(title, author, url)
        try {
            const newObject = {
                title: title,
                author: author,
                url: url,
            }
            const newEntry = await blogService.create(newObject)
            setTitle('')
            setAuthor('')
            setUrl('')  
            setMessage('blog entry successful')
            setTimeout(() => {
                setMessage('')
            }, messageTimer)
        } catch (exception) {
            setMessage('error, blog entry unsuccessful')
            setTimeout(() => {
                setMessage('')
            }, messageTimer)
            console.error('error', exception)
        }
    }

    if (user !== null) {
        return(
            <div>
                <h2>create new entry</h2>
                <form onSubmit={newBlog}>
                    <div>
                        title: <input type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)} />
                    </div>
                    <div>
                        author: <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
                    </div>
                    <div>
                        url: <input type='text' value={url} onChange={({ target }) => setUrl(target.value)} />
                    </div>
                    <button type='submit'>Create blog</button>
                </form>
            </div>
        )
    }
    return <div></div>
}

export default BlogForm