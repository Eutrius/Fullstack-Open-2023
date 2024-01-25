import React from 'react'
import '@testing-library/jest-dom'
import { getByText, render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog/>' , () => {
  let container
  const mockHandler = jest.fn()
  beforeEach(() => {
    const blog = {
      title: 'fullstack open',
      author: 'helsinki',
      url: 'https://fullstackopen.com',
      likes: 99,
      user: {
        name: 'demonstration',
        username: 'demo'
      }
    }
    container = render(<Blog blog={blog} handleLike={mockHandler} />).container
  })


  test('renders only blog\'s author and title by default', () => {
    const titleAuthorDiv = container.querySelector('.titleAuthorDiv')
    expect(titleAuthorDiv).toHaveTextContent('fullstack open helsinki')
    const urlLikesDiv = container.querySelector('.urlLikesDiv')
    expect(urlLikesDiv).toHaveStyle('display: none')
  })

  test('after clicking view, url and likes are rendered', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.toggleButton')
    expect(button).toHaveTextContent('view')
    await user.click(button)

    const urlLikesDiv = container.querySelector('.urlLikesDiv')
    expect(urlLikesDiv).not.toHaveStyle('display: none')

  })

  test('clicking the like button twice calls the event handler twice', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.likeButton')
    expect(button).toHaveTextContent('like')
    await user.dblClick(button)

    expect(mockHandler.mock.calls).toHaveLength(2)


  })


})
