import React from 'react'
import blogService from '../services/blogs'

export const Delete = ({ blog, setBlogs, setMessage }) => {

    const deleteFunction = async () => {
        try {        
            if (!window.confirm('Do you really want to delete this blog entry? This cannot be undone.')) {return}
            await blogService.deleteBlog(blog.id)
            const blogs = await blogService.getAll() // make sure deleted blog is removed
            console.log(blogs)
            setBlogs(blogs)
        } catch (exception) {
            setMessage('error, like was unsuccessful')
            setTimeout(() => {
                setMessage('')
            }, 5000)
            console.error('error', exception)
        }
    }

    return (
        <div>
            <button onClick={() => deleteFunction()}>Delete</button>
        </div>
    )
}


export default Delete