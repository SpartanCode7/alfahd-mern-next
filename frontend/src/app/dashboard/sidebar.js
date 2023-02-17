import Link from 'next/link'
import React from 'react'

function Sidebar() {
  return (
    <div className='sidebar__inner'>
        <Link href="/dashboard/categories">Categories</Link>
        <Link href="/dashboard/gallery">Gallery</Link>
        <Link href="/dashboard/orders">Orders</Link>
        {/* <Link href="/dashboard/pages">Pages</Link> */}
        <Link href="/dashboard/products">Products</Link>
        <Link href="/dashboard/settings">Settings</Link>
        <Link href="/dashboard/users">Users</Link>
    </div>
  )
}

export default Sidebar