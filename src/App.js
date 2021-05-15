import React, { useState, useEffect } from 'react'
import Message from './components/Message'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  return (
    <div>
      <h2>blogs</h2>
      <Message message={message} />
      <Login user={user} setUser={setUser}  username={username} setUsername={setUsername} password={password} setPassword={setPassword} setMessage={setMessage} />
      <BlogForm user={user} setMessage={setMessage} />
      {user !== null 
      ? blogs.map(blog => <Blog key={blog.id} blog={blog} />)
      : null  
      }
    </div>
  )
}

export default App




















  // const handleLogin = async event => {
  //   event.preventDefault()
  //   console.log('logging in with', username, password)
  //   try {
  //     const user = await loginService.login({ username, password, })
  //     window.localStorage.setItem('loggedInAppUser', JSON.stringify(user))
  //     blogService.setToken(user.token)
  //     setUser(user)
  //     console.log(user)
  //     setUsername('')
  //     setPassword('')
  //   } catch (exception) {
  //     console.error('error: ', exception)
  //   }
  // }
  
  // const logout = (event) => {
  //   window.localStorage.removeItem('loggedInAppUser')
  //   window.location.reload()
  // }
    //console.log(window.localStorage.getItem('l'))

  // function that returns form if user isn't logged in
  // const loginForm = () => {
  //   if (!user) {
  //     return <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
  //   }
  //   return <div><p>{user.username} is logged in. <button onClick={logout}>Log out</button></p></div>
  // }