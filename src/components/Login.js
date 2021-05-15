import React from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
const messageTimer = 10000000

const Login = ({ user, setUser, username, setUsername, password, setPassword, setMessage }) => {

    const handleLogin = async event => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
            const user = await loginService.login({ username, password, })
            window.localStorage.setItem('loggedInAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setMessage('user logged in successfully')
            setTimeout(() => {
            setMessage('')
            }, messageTimer)
        } catch (exception) {
            setMessage('login unsuccessful')
            setTimeout(() => {
                setMessage('')
            }, messageTimer)
            console.error('error: ', exception)

        }
      }

    const logout = (event) => {
        window.localStorage.removeItem('loggedInAppUser')
        window.location.reload()
      }

      if (user === null) {
        return (
            <div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password
                    <input type='text' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type='submit'>login</button>
            </form>
            </div>  
        )
    }
    return <div><p>{user.username} is logged in. <button onClick={logout}>Log out</button></p></div>
}

export default Login