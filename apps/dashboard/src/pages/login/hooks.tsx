import { PASSWORD_REGEX, EMAIL_REGEX, handleApiError } from '@core/utils';
import { addVendorDetails } from '@dashboard/slices/vendorDetailsSlice';
import { useAppDispatch } from '@dashboard/store';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPostLogin } from '@dashboard/api/login/post-login';
import { apiGetVendorDetails } from '@dashboard/api/vendor/get-details';
import { apiResendVerification } from '@dashboard/api/login/resend-verification';
import { apiRegister } from '@dashboard/api/login/register';

type TInputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const [regLogButtonLoading, setRegLogButtonLoading] = useState(false);
  const [resendButtonLoading, setResendButtonLoading] = useState(false);

  const [verificationSent, setVerificationSent] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useAppDispatch();

  const handleUsernameChange = (event: TInputChangeEvent) => {
    setUsername(event.target.value);
    setError('');
    setFieldErrors({ ...fieldErrors, email: '' });
  };

  const handlePasswordChange = (event: TInputChangeEvent) => {
    setPassword(event.target.value);
    setError('');
    setFieldErrors({ ...fieldErrors, password: '' });
  };

  const toggleLoginRegister = () => {
    setIsLogin(!isLogin);
    setError('');
    setFieldErrors({ password: '', email: '' });
  };

  const handleResendVerification = async () => {
    setResendButtonLoading(true);
    try {
      await apiResendVerification({ email: username });

      setVerificationSent(true);
      setError('');
    } catch (err) {
      handleApiError(err);
    }
    setResendButtonLoading(false);
  };

  const setVendorDetails = async () => {
    const { data } = await apiGetVendorDetails();

    const { name, email, apiKey, plan, vendorContract, tokenAddress, _id } =
      data;
    dispatch(
      addVendorDetails({
        name,
        email,
        apiKey,
        plan,
        vendorContract,
        tokenAddress,
        id: _id,
      }),
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setRegLogButtonLoading(true);
    if (isLogin) {
      try {
        const { data } = await apiPostLogin({ email: username, password });

        // Redirect to dashboard upon successful login
        localStorage.setItem('JWT', data.token);
        await setVendorDetails();
        navigate('/dashboard');
      } catch (err) {
        const { message } = handleApiError(err);
        setError(message);
      }
    } else {
      // register and login
      const validPassword = PASSWORD_REGEX.test(password);
      const validEmail = EMAIL_REGEX.test(username);

      if (!validPassword)
        setFieldErrors({
          ...fieldErrors,
          password:
            'Enter a stronger password. Password must be at least 8 alphanumeric characters with one capitalized and non-capitalized and one special character',
        });

      if (!validEmail)
        setFieldErrors({ ...fieldErrors, email: 'Enter a valid email' });

      if (!validEmail || !validPassword) {
        setFieldErrors({
          email: validEmail ? '' : 'Enter a valid email',
          password: validPassword
            ? ''
            : 'Enter a stronger password. Password must be at least 8 alphanumeric characters with one capitalized and non-capitalized and one special character',
        });
        return;
      }

      try {
        await apiRegister({ email: username, password });

        setVerificationSent(true);
      } catch (err) {
        const { message } = handleApiError(err);
        setError(message);
      }
    }
    setRegLogButtonLoading(false);
  };

  return {
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
  };
};
