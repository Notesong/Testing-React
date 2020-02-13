import React from 'react'
import { render, fireEvent, wait, act } from '@testing-library/react'
import { getData as mockGetData } from '../api'
import StarWarsCharacters from './StarWarsCharacters'

jest.mock('../api')

test('next button and previous button working and API data being called and rendering', async () => {
    mockGetData.mockResolvedValueOnce({
        results: [{
            name: 'Luke Skywalker',
            url: 'https://swapi.co/api/people/1/'
        }],
        next: "next page",
        previous: null
    })

    const { getByText } = render(<StarWarsCharacters />)
    
    // set buttons to variables and click them
    const nextButton = getByText(/next/i)
    const previousButton = getByText(/previous/i)
    fireEvent.click(nextButton)
    fireEvent.click(previousButton)

    // check if data has loaded
    await wait(() => expect(getByText(/luke/i)))

    // make sure data has been called
    expect(mockGetData).toHaveBeenCalledTimes(1)
})