import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent, { TargetElement } from '@testing-library/user-event'
import App from './App'
import { isTryStatement } from 'typescript'

describe('App', () => {
  it('should render App component', async () => {
    render(<App />)
    // i - case insensitive
    expect(screen.getByText(/Search for/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).not.toBeRequired()
    expect(screen.getByAltText(/alt text/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Search/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('placeholder text')).toBeInTheDocument()
    expect(screen.getByDisplayValue('')).toBeInTheDocument()

    expect(screen.queryByText(/Search for something/i)).toBeNull()
    /*
  		query - only if you assert that an element isn`t in the document,
  		because getBy can`t get an element in time
  	*/

    expect(screen.queryByText(/Logged in as/i)).toBeNull()
    screen.debug()
    expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument()
    screen.debug()
    // findBy for async
  })
})
describe('events', () => {
  it('input', async () => {
    render(<App />)

    await screen.findByText(/Logged in as/i)
    expect(screen.queryByText(/Search for something/i)).toBeNull()
    screen.debug()

    // fireEvent.change(screen.getByRole('textbox'), {
    //   target: { value: 'something' },
    // })
    userEvent.type(screen.getByRole('textbox'), 'something')
    expect(screen.queryByText(/Search for something/i)).toBeInTheDocument()
    screen.debug()
  })
  it('checkbox', () => {
    const changeHandler = jest.fn()
    const { container } = render(
      <input type="checkbox" onChange={changeHandler} />,
    )
    const checkbox = container.firstChild

    expect(checkbox).not.toBeChecked()
    // fireEvent.click(checkbox!)
    userEvent.click(checkbox as TargetElement)
    expect(checkbox).toBeChecked()
  })
  it('input focus', () => {
    const { getByTestId } = render(
      <input type="text" data-testid="something" />,
    )
    const input = getByTestId('something')

    expect(input).toBeInTheDocument()
    expect(input).not.toHaveFocus()
    input.focus()
    expect(input).toHaveFocus()
  })
  it('tab focus', () => {
    const { getAllByTestId } = render(
      <>
        <input data-testid="element" type="radio" />
        <input data-testid="element" type="number" />
        <input data-testid="element" type="checkbox" />
      </>,
		)
		const [radio, number, checkbox] = getAllByTestId('element')

		userEvent.tab()
		expect(radio).toHaveFocus()
		userEvent.tab()
		expect(number).toHaveFocus()
		userEvent.tab()
		expect(checkbox).toHaveFocus()
	})
	it('select', () => {
		const { getByRole, getByText } = render(
			<select>
				<option value="1">a</option>
				<option value="2">b</option>
				<option value="3">c</option>
			</select>
		)

		userEvent.selectOptions(getByRole('combobox'), '1')
		const option1: any = getByText('a')
		expect(option1).toBeTruthy()

		userEvent.selectOptions(getByRole('combobox'), '2')
		const option2: any = getByText('b')
		expect(option2.selected).toBeTruthy()
		expect(option1.selected).toBeFalsy()
	})
})
