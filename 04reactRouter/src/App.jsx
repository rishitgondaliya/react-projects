import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import About from "../components/About/About";
import Home from "../components/Home/Home";
import Contact from "../components/Contact/Contact";
import Github, { githubInfoLoader } from "../components/Github/Github";
import User from "../components/User/User";

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: <Layout />,
  //     children: [
  //       {
  //         index: true,
  //         path: 'home',
  //         element: <Home />
  //       },
  //       {
  //         path: 'about',
  //         element: <About />
  //       },
  //       {
  //         path: 'contact',
  //         element: <Contact />
  //       },
  //       {
  //         path: 'github',
  //         element: <Github />
  //       }
  //     ]
  //   }
  // ])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="user/:userId" element={<User />} />
        <Route loader={githubInfoLoader} path="github" element={<Github />} />
      </Route>
    )
  );

  return (
    <>
      {/* <h1 className="bg-gray-500 text-4xl text-center p-4 m-4 ">React Router</h1> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
