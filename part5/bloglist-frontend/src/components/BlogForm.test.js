import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogFrom'
import userEvent from '@testing-library/user-event'


describe('<BlogForm/>', () => {
  test('form calls onSubmit with right arguments', async () => {
    const createBlog = jest.fn((e) => e.preventDefault())
    const user = userEvent.setup()

    render(<BlogForm handleSubmit={createBlog}/>)

    const blog = {
      title: 'fullstack open',
      author: 'helsinki',
      url: 'https://fullstackopen.com'
    }

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen. getByPlaceholderText('Url')
    const submit = screen.getByText('create')

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)

    await user.click(submit)

    const request = createBlog.mock.calls[0][1]
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(request.title).toBe(blog.title)
    expect(request.author).toBe(blog.author)
    expect(request.url).toBe(blog.url)



  })
})
