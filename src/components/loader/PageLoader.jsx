import React from 'react'
import './loader.css'

const PageLoader = (props) => {
    return (
        <div className={props.show ? 'fixed z-10 w-full min-h-screen grid place-items-center bg-gray-800' : 'hidden'}>
            <div className='loader absolute'></div>
        </div>
    )
}

export default PageLoader