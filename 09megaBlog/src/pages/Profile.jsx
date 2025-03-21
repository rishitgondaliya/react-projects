// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import profileService from '../appwrite/profileService.js';
// import authService from '../appwrite/auth.js';
// import { LogoutBtn } from '../components/index.js';
// import { Avatar, Button, Container, TextField, Typography, Box, ButtonGroup, Dialog, DialogContent, IconButton } from '@mui/material';
// import { styled } from '@mui/system';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// // VisuallyHiddenInput styled component
// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// const Profile = () => {
//   const { register, handleSubmit, setValue } = useForm();
//   const [profileImageUrl, setProfileImageUrl] = useState(""); // Profile image URL state
//   const [error, setError] = useState(null);
//   const [newProfilePicture, setNewProfilePicture] = useState(null); // New profile picture state
//   const [isEditing, setIsEditing] = useState(false); // Toggle editing mode
//   const [userData, setUserData] = useState(null); // User data state
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for large image
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const user = await authService.getCurrentUser();
//         setUserData(user);
//         setValue("name", user.name);
//         setValue("email", user.email);

//         if (user.prefs && user.prefs.profilePicture) {
//           const profilePictureUrl = profileService.getProfilePicturePreview(user.prefs.profilePicture);
//           setProfileImageUrl(profilePictureUrl);
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         setError("Failed to fetch user profile.");
//       }
//     };

//     fetchUserProfile();
//   }, [setValue]);

//   // Handle file input change
//   const handleFileChange = (event) => {
//     setNewProfilePicture(event.target.files[0]);
//   };

//   // Function to update profile picture
//   const handleUpdateProfilePicture = async () => {
//     if (newProfilePicture) {
//       try {
//         const uploadedUrl = await profileService.uploadProfilePicture(newProfilePicture);
//         if (uploadedUrl) {
//           setProfileImageUrl(uploadedUrl);
//           setError(null);
//           alert("Profile picture updated successfully!");
//           setIsEditing(false); // Exit editing mode
//         } else {
//           setError("Failed to get the uploaded image URL.");
//         }
//       } catch (error) {
//         setError("Failed to update profile picture.");
//       }
//     } else {
//       setError("Please select a file to upload.");
//     }
//   };

//   // Function to save updated user data
//   const onSubmit = async (data) => {
//     try {
//       const { name, email, password } = data;
//       await authService.updateUser({ name, email, password });
//       alert("Profile updated successfully!");
//       setIsEditing(false); // Exit editing mode
//     } catch (error) {
//       if (error.message.includes("Email already exists")) {
//         setError("The email address is already in use by another account.");
//       } else {
//         setError("Failed to update profile.");
//       }
//     }
//   };

//   // Open modal for large image
//   const handleImageClick = () => {
//     setIsModalOpen(true);
//   };

//   // Close modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const logoutHandler = () => {
//     setError(null); // Clear any existing error messages
//     setIsEditing(false); // Ensure editing mode is closed
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box mt={4}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Your Profile
//         </Typography>

//         {userData && (
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Box display="flex" justifyContent="center" mb={4}>
//               {profileImageUrl ? (
//                 <Avatar
//                   alt="Profile Picture"
//                   src={profileImageUrl}
//                   sx={{ width: 96, height: 96, cursor: 'pointer' }}
//                   onClick={handleImageClick} // Open modal on click
//                 />
//               ) : (
//                 <Avatar sx={{ width: 96, height: 96 }}>
//                   <Typography>No Profile Picture</Typography>
//                 </Avatar>
//               )}
//             </Box>

//             {isEditing && (
//               <Box display="flex" justifyContent="center">
//                 <ButtonGroup
//                   variant="contained"
//                   aria-label="outlined primary button group"
//                   orientation="horizontal"
//                   sx={{ mb: 2 }}
//                 >
//                   <Button
//                     component="label"
//                     startIcon={<CloudUploadIcon />}
//                     color="secondary"
//                   >
//                     Upload image
//                     <VisuallyHiddenInput
//                       type="file"
//                       onChange={handleFileChange}
//                       multiple
//                     />
//                   </Button>

//                   <Button
//                     onClick={handleUpdateProfilePicture}
//                     color="primary"
//                   >
//                     Update Profile Picture
//                   </Button>
//                 </ButtonGroup>
//               </Box>
//             )}

//             <TextField
//               label="Name"
//               fullWidth
//               variant="outlined"
//               {...register("name")}
//               margin="normal"
//               InputProps={{ readOnly: !isEditing }}
//             />

//             <TextField
//               label="Email"
//               fullWidth
//               variant="outlined"
//               {...register("email")}
//               margin="normal"
//               InputProps={{ readOnly: !isEditing }}
//             />

//             {isEditing && (
//               <TextField
//                 label="Password"
//                 fullWidth
//                 variant="outlined"
//                 {...register("password", { required: true })}
//                 type="password"
//                 margin="normal"
//               />
//             )}

//             <Box mt={4} display="flex" justifyContent="center">
//               {!isEditing && (
//                 <>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => setIsEditing(true)}
//                     sx={{ mr: 2 }}
//                   >
//                     Edit Profile
//                   </Button>
//                   <LogoutBtn onLogout={logoutHandler} />
//                 </>
//               )}

//               {isEditing && (
//                 <>
//                   <Button
//                     variant="contained"
//                     color="error"
//                     onClick={() => setIsEditing(false)}
//                     sx={{ mr: 2 }}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="secondary"
//                   >
//                     Save Changes
//                   </Button>
//                 </>
//               )}
//             </Box>

//             {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
//           </form>
//         )}

//         {/* Modal to show the larger image */}
//         <Dialog open={isModalOpen} onClose={handleCloseModal}>
//           <DialogContent>
//             <img
//               src={profileImageUrl}
//               alt="Profile"
//               style={{ width: '100%', height: '50vh' }} // Adjust as needed
//             />
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </Container>
//   );
// };

// export default Profile;


// Profile.jsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Typography, Box } from '@mui/material';
import profileService from '../appwrite/profileService';
import authService from '../appwrite/auth';
import ProfilePicture from '../components/profile/ProfilePicture';
import ProfileForm from '../components/profile/ProfileForm';
import ImageUpload from '../components/profile/ImageUpload';
import Modal from '../components/profile/Modal';

const Profile = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await authService.getCurrentUser();
        setUserData(user);
        setValue("name", user.name);
        setValue("email", user.email);
        if (user.prefs && user.prefs.profilePicture) {
          const profilePictureUrl = profileService.getProfilePicturePreview(user.prefs.profilePicture);
          setProfileImageUrl(profilePictureUrl);
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchUserProfile();
  }, [setValue]);

  const handleFileChange = (event) => {
    setNewProfilePicture(event.target.files[0]);
  };

  const handleUpdateProfilePicture = async () => {
    if (newProfilePicture) {
      try {
        const uploadedUrl = await profileService.uploadProfilePicture(newProfilePicture);
        if (uploadedUrl) {
          setProfileImageUrl(uploadedUrl);
          setError(null);
          alert("Profile picture updated successfully!");
          setIsEditing(false);
        }
      } catch (error) {
        setError(error);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data;
      await authService.updateUser({ name, email, password });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Profile
        </Typography>
        {userData && (
          <>
            <ProfilePicture profileImageUrl={profileImageUrl} handleImageClick={handleImageClick} />
            {isEditing && (
              <ImageUpload handleFileChange={handleFileChange} handleUpdateProfilePicture={handleUpdateProfilePicture} />
            )}
            <ProfileForm
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              error={error}
            />
          </>
        )}
        <Modal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} profileImageUrl={profileImageUrl} />
      </Box>
    </Container>
  );
};

export default Profile;
