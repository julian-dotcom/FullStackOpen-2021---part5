import React from 'react'
import blogService from '../services/blogs'
import propTypes from 'prop-types'

const Delete = ({ blog, setBlogs, setMessage }) => {

    const deleteFunction = async () => {
        try {        
            if (!window.confirm('Do you really want to delete this blog entry? This cannot be undone.')) {return}
            const response = await blogService.deleteBlog(blog.id)
            console.log(response)
            const blogs = await blogService.getAll() // make sure deleted blog is removed from rendered list
            setBlogs(blogs)
        } catch (exception) {
            setMessage('error, deletion was unsuccessful')
            setTimeout(() => {
                setMessage('')
            }, 5000)
            console.error('error', exception)
        }
    }

    return (
        <div>
            <button className='deleteButton' onClick={() => deleteFunction()}>Delete</button>
        </div>
    )
}

// Delete.propTypes = {
//     blog: propTypes.object.isRequired, 
//     setBlogs: propTypes.func.isRequired, 
//     setMessage: propTypes.func.isRequired
// }


export default Delete