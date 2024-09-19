/* eslint-disable no-unused-vars */
import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'HOME',
      slug: "/",
      active: true
    },
    {
      name: "LOGIN",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SIGN UP",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "ALL BLOGS",
      slug: "/all-blogs",
      active: authStatus,
    },
    {
      name: "CREATE YOUR BLOG",
      slug: "/create-blog",
      active: authStatus,
    },
  ]


  return (
    <header className="py-3 shadow sticky z-50 top-0 w-full bg-[#FCCDCD]">
      <Container>
        <nav className='flex'>
          <div className="mr-4">
            <Link to='/'>
              <div className="flex">
              <Logo width='40px' />
              <h2 className="text-xl ml-4 my-auto text-center font-mono">Blogify</h2>
              </div>
            </Link>
          </div>
          <ul className="ml-auto flex">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className='inline-block text-base px-6 py-2 duration-200 hover:bg-[#F85046] rounded-full'
                    onClick={() => navigate(item.slug)}>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header