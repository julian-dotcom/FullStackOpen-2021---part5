import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'



describe('<Blog />', () => {
    const blog = {
        "title": "Title for testing",
        "author": "Author for testing",
        "url": "Url for testing",
        "likes": "101"
    }

    let component
    beforeEach(() => {
      component = render(
        <Blog blog={blog} />
      )
    })

    test('renders content', () => {
        expect(component.container).toHaveTextContent('Title for testing')    
    })

    test('renders its children', () => {
        expect(
        component.container.querySelector('.toggableContent')
        ).toBeDefined()
    })

    test('renders content, but doesn\'t render likes and url', () => {
        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')    
    })

    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('show')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

})