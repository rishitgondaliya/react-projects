// import { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { Outlet } from 'react-router-dom'
// import { login, logout } from './store/authSlice'
// import { Header, Footer } from './components/index'
// import authService from './appwrite/auth'
// import './App.css'

// function App() {
//   const [loading, setLoading] = useState(true)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     authService.getCurrentUser()
//       .then((userData) => {
//         if (userData) {
//           dispatch(login({ userData }))
//         } else {
//           dispatch(logout())
//         }
//       })
//       .finally(() => setLoading(false))
//   }, [])

//   // conditional rendering
//   return !loading ? (
//     <div className="min-h-screen flex flex-wrap content-between"
//     style={{backgroundImage: 'linear-gradient(to right, #9aabff, #48e4dc)'}}>
//       <div className="w-full block">
//         <Header />
//         <main className='p-8'>
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   ) : null
// }

// export default App


import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components/index'
import authService from './appwrite/auth'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          // Dispatch login if userData exists
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  // conditional rendering
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between"
    style={{backgroundImage: 'linear-gradient(to right, #9aabff, #48e4dc)'}}>
      <div className="w-full block">
        <Header />
        <main className='p-8'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
