import React, { useState } from 'react'
import LikeButton from './LikeButton'
import Delete from './Delete'

const Blog = ({ blog, setBlogs, setMessage }) => {
  const blogStyle = {
    border: 'solid grey 1px',
    borderRadius: '5px',
    padding: '5px',
    width: '300px'
  }

  const [detailsVisible, setDetailsVisible] = useState(false)
  const showDetails = { display: detailsVisible ? '' : 'none' }
  return (
    <div style={blogStyle} className='blogClass'>
      <div>
        {blog.title} <button className='show' onClick={() => setDetailsVisible(!detailsVisible)}>{ detailsVisible ? 'hide' : 'show' }</button>
      </div>
      <div style={showDetails} className='togglableContent'>
        url: {blog.url}
        <br />
        <LikeButton blog={blog} setBlogs={setBlogs} setMessage={setMessage} />
        author: {blog.author}
        <Delete blog={blog} setBlogs={setBlogs} setMessage={setMessage} />
      </div>
    </div> 
  
  )
}

export default Blog