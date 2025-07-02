import { TextField, Grid, Typography, Box } from '@mui/material';

import CentrePage from '../../components/UI/CentrePage';
import CustomButton from '@components/button';
import { useLogin } from './hooks';

function Login() {
  const {
    isLogin,
    handleSubmit,
    fieldErrors,
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
    error,
    verificationSent,
    regLogButtonLoading,
    toggleLoginRegister,
    handleResendVerification,
    resendButtonLoading,
  } = useLogin();

  return (
    <CentrePage>
      <Typography variant="h4">RecurCrypt</Typography>
      <Typography variant="h5">{isLogin ? 'Login' : 'Register'}</Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="text"
              label="Email"
              variant="outlined"
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
              fullWidth
              value={username}
              onChange={handleUsernameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
              fullWidth
              value={password}
              onChange={handlePasswordChange}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography sx={{ ml: 2, color: 'red' }}>{error}</Typography>
            </Grid>
          )}
          {verificationSent && (
            <Grid item xs={12}>
              <Typography sx={{ ml: 2 }}>
                A verification link has been sent to your email. Please click on
                it to verify your email
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <CustomButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              loading={regLogButtonLoading}
              text={isLogin ? 'Login' : 'Register'}
            />
          </Grid>
        </Grid>
      </form>

      <Box sx={{ width: '100%', mt: 2 }}>
        <CustomButton
          variant="outlined"
          color="primary"
          fullWidth
          onClick={toggleLoginRegister}
          text={isLogin ? 'Change To Register' : 'Change To Login'}
        />
        {error === 'Email Unverified' && (
          <CustomButton
            sx={{ mt: 2 }}
            fullWidth
            variant="outlined"
            text="RESEND VERIFICATION EMAIL"
            onClick={handleResendVerification}
            loading={resendButtonLoading}
            disabled={verificationSent}
          />
        )}
      </Box>
    </CentrePage>
  );
}

export default Login;
