import React from 'react'
import NavbarStyle from './NavbarStyle'
import QuoteGenerator from './Quotes'
import Morning from './Morning'

const Banner = () => {
    return (
       <>
       <NavbarStyle />
       <QuoteGenerator />
       <Morning />
       {/* <CalendarWithNotes /> */}
       </>
    )
}

export default Banner