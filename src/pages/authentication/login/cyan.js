/* eslint-disable no-nested-ternary */
import { useState } from 'react';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Stack, Link, Tooltip, Typography, Button } from '@material-ui/core';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import Settings from '../../../components/settings';
import Page from '../../../components/Page';
import { MHidden } from '../../../components/@material-extend';
import { LoginForm } from '../../../components/authentication/login';
import { RegisterForm } from '../../../components/authentication/register';
import AuthFirebaseSocials from '../../../components/authentication/AuthFirebaseSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(() => ({
  // eslint-disable-next-line no-useless-concat
  backgroundImage: 'url(' + '/static/login/cyan.jpeg' + ')',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  display: 'flex'
}));

const SecondaryStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    margin: 'auto'
  },
  width: '70%',
  // padding: '50px 0',
  minHeight: '600px'
}));

const SectionStyle = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  maxHeight: '630px',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  minHeight: '630px',
  // eslint-disable-next-line no-useless-concat
  backgroundImage: 'url(' + '/static/login/cyan_right.jpg' + ')',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  borderRadius: '0 40px 40px 0'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  maxHeight: '630px',
  minHeight: '630px',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 5),
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '40px 0 0 40px'
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method, login } = useAuth();
  const [signUp, setSignUp] = useState(false);

  const handleLoginAuth0 = async () => {
    try {
      await login();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    setSignUp(!signUp);
  };

  return (
    <RootStyle title="Login">
      <SecondaryStyle>
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Hi, Welcome Back
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
            </Box>

            <Tooltip title="trinm">
              <Box component="img" src="/static/login/logo_without_text.svg" sx={{ width: 50, height: 50 }} />
            </Tooltip>
          </Stack>

          {method === 'firebase' && <AuthFirebaseSocials />}

          {method !== 'auth0' ? (
            signUp ? (
              <RegisterForm />
            ) : (
              <LoginForm />
            )
          ) : (
            <Button fullWidth size="large" type="submit" variant="contained" onClick={handleLoginAuth0}>
              Login
            </Button>
          )}

          <MHidden width="mdDown">
            {signUp ? (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account?&nbsp;
                <Link variant="text" onClick={handleClick}>
                  Login
                </Link>
              </Typography>
            ) : (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?&nbsp;
                <Link variant="text" onClick={handleClick}>
                  Get started
                </Link>
              </Typography>
            )}
          </MHidden>
        </ContentStyle>

        <MHidden width="mdDown">
          <SectionStyle>
            <Typography variant="h4" sx={{ px: 5, mt: 14, mb: 3, fontStyle: 'italic' }}>
              Imagination at Work.
            </Typography>
            <Typography variant="body2" sx={{ px: 5, fontStyle: 'italic' }}>
              This culture and theme resulted in a rebranding with the new tagline "Imagination at Work," which embodies
              the idea that imagination inspires the human initiative to thrive at what we do.
            </Typography>
          </SectionStyle>
        </MHidden>
      </SecondaryStyle>
      <MHidden width="mdDown">
        <Settings />
      </MHidden>
    </RootStyle>
  );
}
