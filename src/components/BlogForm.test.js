import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm user={true} />
  )
  console.log('titties')
  const title = component.container.querySelector('#title')
//   const author = component.container.querySelector('#author')
//   const author = component.container.querySelector('#author')

  const form = component.container.querySelector('form')
  console.log('title: ', title)

  fireEvent.change(title, { 
    target: { value: 'testing of forms could be easier' } 
  })
  fireEvent.submit(form)
  console.log('title: ', title)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
  //expect(createBlog.mock.calls[0][0].input).toBe('testing of forms could be easier' )
})