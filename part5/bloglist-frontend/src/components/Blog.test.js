import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('blog displayed', () => {
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'website.com',
      likes: 1,
      user: {
        name: 'name'
      }
    }
  
    const user = {
      username: 'test',
      name: 'test',
      passwordHash: 'secretpassword',
      blogs: [
  
      ]
    }
  
    const blogs = {}
  
    const setBlogs = () => {
      console.log('set blogs')
    }
    

    component = render(
      <Blog key={blog.id} blog={blog} loggedInUser={user} allBlogs={blogs} setBlogs={setBlogs} addLikeForTesting={mockHandler}/> 

    )
  })


  test('renders title and author, but not url and likes by default', () => {

    expect(component.container.querySelector('.defaultView')).toHaveTextContent(
      'blog title'
    )
  
    expect(component.container.querySelector('.defaultView')).toHaveTextContent(
      'blog author'
    )
  
    expect(component.container.querySelector('.sectionDisplayedOnClick')).toHaveStyle(
      'display: none'
    )  

  })

  test('when button is clicked, url and likes are shown', () => {

    const button = component.getByText('view')

    fireEvent.click(button)
    
    expect(component.container.querySelector('.sectionDisplayedOnClick')).toHaveTextContent(
      'website.com'
    )

    expect(component.container.querySelector('.sectionDisplayedOnClick')).toHaveTextContent(
      1
    )

  })

  test('if like button is clicked twice, event handler that is passed in as props is called twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })


})




