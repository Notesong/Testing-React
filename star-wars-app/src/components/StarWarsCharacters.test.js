import React from 'react'
import { render, fireEvent, wait, act } from '@testing-library/react'
import { getData as mockGetData } from '../api'
import axios from 'axios';
import StarWarsCharacters from './StarWarsCharacters'

jest.mock('axios', () => {
    return {
        get: jest.fn(() => Promise.resolve({
            data: {
                results: [{
                    name: 'Luke Skywalker',
                    url: 'https://swapi.co/api/people/'
                }],
                next: "next page",
                previous: null    
            }
        }))
    }
});

test('next button and previous button working', async () => {
    const { getByText } = render(<StarWarsCharacters />)
    
    // set buttons to variables and click them
    const nextButton = getByText(/next/i)
    const previousButton = getByText(/previous/i)
    fireEvent.click(nextButton)
    fireEvent.click(previousButton)

    // check if data has loaded
    await wait(() => expect(getByText(/luke/i)))

    // make sure data has been called
    expect(axios.get).toHaveBeenCalledTimes(1)
})

test('data rendering', async () => {
    const { getByText } = render(<StarWarsCharacters />)

    // check if data has loaded
    await wait(() => expect(getByText(/luke/i)))
})

test('API data being called', async () => {
    // make sure data has been called
    expect(axios.get).toHaveBeenCalledTimes(2)
})