import React from 'react'
import QuoteGenerator from './Quotes'
import Morning from './Morning'
import Notes from './Notes'
import DateSelector from './Nav'

const Banner = () => {
    return (
        <>
        {/* <Sidebar /> */}
            <div className='container'>
                <DateSelector />
                <QuoteGenerator />
            </div>
        </>
    )
}

export default Banner