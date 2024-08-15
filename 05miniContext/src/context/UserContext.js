import React from 'react'

const UserContext = React.createContext()

export default UserContext

// import { createContext, useContext, useState } from "react";

// // Create the UserContext with default values
// export const UserContext = createContext({
//     user: null,
//     setUser: () => {},
// });

// // Create the UserProvider component
// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// // Custom hook to use the UserContext
// export default function useUser() {
//     return useContext(UserContext);
// }
