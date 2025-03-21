/* eslint-disable react/prop-types */
import { TextField, Box, Button, Typography } from '@mui/material';
import LogoutBtn from '../Header/LogoutBtn';

const ProfileForm = ({ register, handleSubmit, onSubmit, isEditing, setIsEditing, error }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        fullWidth
        variant="outlined"
        {...register("name")}
        margin="normal"
        InputProps={{ readOnly: !isEditing }}
      />
      <TextField
        label="Email"
        fullWidth
        variant="outlined"
        {...register("email")}
        margin="normal"
        InputProps={{ readOnly: !isEditing }}
      />

      {isEditing && (
        <TextField
          label="Password"
          fullWidth
          variant="outlined"
          {...register("password")}
          type="password"
          margin="normal"
        />
      )}

      <Box mt={4} display="flex" justifyContent="center">
        {!isEditing ? (
          <Box mt={4} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} sx={{ mr: 2 }}>
              Edit Profile
            </Button>
            <LogoutBtn />
          </Box>
        ) : (
          <>
            <Button variant="contained" color="error" onClick={() => setIsEditing(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              Save Changes
            </Button>
          </>
        )}
      </Box>

      {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
    </form>
  );
};

export default ProfileForm;
