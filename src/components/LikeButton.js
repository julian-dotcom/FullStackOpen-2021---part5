import React from 'react'
import blogService from '../services/blogs'

const LikeButton = ({ blog, setBlogs, setMessage }) => {

    const updateLikes = async (blog) => {
        try {
            blog.likes++
            const updatedObject = await blogService.update(blog.id, blog)
            const blogs = await blogService.getAll() // make sure newly added blog is shown
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
            likes: {blog.likes}  <button className='likeButton' onClick={() => updateLikes(blog)}>Like</button>
        </div>
    )
}

export default LikeButton
