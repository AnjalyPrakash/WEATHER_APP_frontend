import React from 'react'
import { Link } from 'react-router-dom'
import '../Css/Home.css'

function Home() {
    return (
        <>
            <div className='bg-image'>
                <div className='d-flex justify-content-center align-items-center flex-column' style={{ height: '80vh' }}>
                    <h2>Make the most of every day with our weather app.</h2>
                    <Link to={'/login'}> <button className='btn btn-danger' style={{ borderRadius: '50px' }}>Get Started</button> </Link>
                </div>
            </div>
        </>
    )
}

export default Home