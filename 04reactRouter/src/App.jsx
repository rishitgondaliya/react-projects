import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import About from '../components/About/About'
import Home from '../components/Home/Home'
import Contact from '../components/Contact/Contact'
import Github from '../components/Github/Github'

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'contact',
          element: <Contact />
        }, 
        {
          path: 'github',
          element: <Github />
        }
      ]
    }
  ])
  return (
    <>
      {/* <h1 className="bg-gray-500 text-4xl text-center p-4 m-4 ">React Router</h1> */}
      <RouterProvider router={router}/>
    </>
  )
}

export default App
