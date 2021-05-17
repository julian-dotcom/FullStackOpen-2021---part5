import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
const messageTimer = 5000

const Login = ({ user, setUser, username, setUsername, password, setPassword, setMessage }) => {

    const [loginVisible, setLoginVisible] = useState(false)

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

      if (user === null) { // user is not logged in
        const hideWhenFormVisible = { display: loginVisible ? 'none' : '' }
        const showWhenFormVisible = { display: loginVisible ? '' : 'none' }
        return (
            <div>
            <div style={hideWhenFormVisible}>
                <button onClick={() => setLoginVisible(true)}>Log in</button>
            </div>
            <div style={showWhenFormVisible}>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input id='username' type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password
                    <input id='password' type='text' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button id='loginSubmit' type='submit'>login</button>
            </form>
            <button onClick={() => setLoginVisible(false)}>cancel</button>
            </div>  
            </div>
        )
    }
    // In case the user is logged in, just show basic info on him
    return <div><p>{user.username} is logged in. <button id='logout' onClick={logout}>Log out</button></p></div>
}

export default Login