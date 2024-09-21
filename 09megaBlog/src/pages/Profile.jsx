import { Container, LogoutBtn } from "../components"
import { useEffect, useState } from "react"
import appwriteService from '../appwrite/auth'

export default function Profile() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await appwriteService.getCurrentUser()
      setUserData(user)
    }

    fetchUser()
  }, [])

  if (!userData) {
    return (
      <Container>
        <div className="w-full py-8 text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="w-full py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
        <p className="text-lg">Name: {userData.name}</p>
        <p className="text-lg">Email: {userData.email}</p>
        {userData.profilePicture ? (
          <img src={userData.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
        ) : (
          <p className="text-lg">No profile picture provided</p>
        )}
      </div>
      <LogoutBtn />
    </Container>
  )
}
