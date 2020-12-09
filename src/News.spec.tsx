import React from 'react'
import axios from 'axios'
import { News, URL } from './News'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('axios')

describe('axios', () => {
  let hits: any

  beforeEach(() => {
    hits = [
      { objectID: 1, title: 'something 1' },
      { objectID: 2, title: 'something 2' },
    ]
  })

  it('should fetch news from the API', async () => {
    // @ts-ignore
		axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits } }))
		
		const { getByRole, findAllByRole } = render(<News />)
		
		userEvent.click(getByRole('button'))
		
    const items = await findAllByRole('listitem')
		expect(items).toHaveLength(2)
		
		// Additional
		expect(axios.get).toHaveBeenCalled()
		expect(axios.get).toHaveBeenCalledTimes(1)
		expect(axios.get).toHaveBeenCalledWith(URL)
  })
})
