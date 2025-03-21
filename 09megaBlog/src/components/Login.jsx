// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useForm } from 'react-hook-form'
// import { useDispatch } from 'react-redux'
// import { login as authLogin } from '../store/authSlice'
// import { Button, Input, Logo } from './index'
// import authService from '../appwrite/auth'

// function Login() {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const { register, handleSubmit } = useForm()
//     const [error, setError] = useState("")

//     const login = async (data) => {
//         setError("")
//         try {
//             const session = await authService.login(data)
//             if (session) {
//                 const userData = await authService.getCurrentUser()
//                 if (userData) dispatch(authLogin(userData))
//                 navigate("/home")
//             }
//         } catch (error) {
//             setError(error.message)
//         }
//     }
//     return (
//         <div className='flex items-center justify-center w-full'>
//             <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//                 <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//                 </div>
//                 <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
//                 <p className="text-center mt-2 text-base text-black/60">
//                     Don&apos;t have an account ?&nbsp;
//                     <Link to="/signup"
//                         className="font-medium text-primary text-blue-500 hover:text-blue-700 transition-all duration-200 ease-in-out">
//                         Sign up
//                     </Link>
//                 </p>
//                 {error &&
//                     <p className='text-red-500 mt-8 text-center'>
//                         {error}
//                     </p>}
//                 <form onSubmit={handleSubmit(login)} className='mt-8'>
//                     <div className="space-y-5">
//                         <Input
//                             label="Email: "
//                             placeholder="Enter your email"
//                             type="email"
//                             {...register("email", {
//                                 required: true,
//                                 validate: {
//                                     matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                                         "enter a valid email address!",
//                                 }
//                             })}
//                         />
//                         <Input
//                             label="Password"
//                             type="password"
//                             placeholder="enter password"
//                             {...register("password", {
//                                 required: true,
//                             })}
//                         />
//                         <Button
//                             type='submit'
//                             className='w-full'
//                         >
//                             Sign in
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Login

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import authService from '../appwrite/auth'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    // Dispatching login with correct userData
                    dispatch(authLogin({ userData }))
                    navigate("/home") // Navigate to home after login
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="text-center mt-2 text-base text-black/60">
                    Don&apos;t have an account ?&nbsp;
                    <Link to="/signup" className="font-medium text-primary text-blue-500 hover:text-blue-700 transition-all duration-200 ease-in-out">
                        Sign up
                    </Link>
                </p>

                {error && <p className='text-red-500 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className="space-y-5">
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "enter a valid email address!",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="enter password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type='submit' className='w-full'>Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
