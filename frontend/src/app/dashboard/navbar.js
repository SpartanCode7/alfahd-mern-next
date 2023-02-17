import React from 'react'
import Link from 'next/link';

function Navbar() {
  return (
    <nav className='nav'>
        <div className='brand__icon'>
            <Link href="/dashboard">
                <img src='https://alfahdstore.com/wp-content/uploads/2022/06/new-logo-1.png' />
            </Link>
        </div>
        <div className='header__nav'>
            <Link href="/">Visit Website</Link>
        </div>
        <div className='user'>
            <h4>User Name</h4>
        </div>
    </nav>
  )
}

export default Navbar