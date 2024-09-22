import { useDispatch } from "react-redux"
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

export default function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
            })
    }
    return (
        <button
            className="inline-block text-base px-6 py-2 duration-200 bg-red-500 hover:bg-[#f9928d] rounded"
            onClick={logoutHandler}
        >
            LOGOUT
        </button>
    )
}