/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
// material
// import EditIcon from '@material-ui/icons/Edit';
import { styled, useTheme } from '@material-ui/core/styles';
import { Box, Stack, Link, Tooltip, Typography, Button, useMediaQuery } from '@material-ui/core';
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
  backgroundImage: 'url(' + '/static/login/pink.jpg' + ')',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  display: 'flex'
}));

const SecondaryStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: 'auto',
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
  backgroundImage: 'url(' + '/static/login/pink_right.jpg' + ')',
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
  borderRadius: '40px 0 0 40px',
  [theme.breakpoints.down('md')]: {
    borderRadius: '40px'
  }
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method, login } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [signUp, setSignUp] = useState(false);
  const [tittle, setTittle] = useState('Imagination at Work.');
  const [tittleSave, setTittleSave] = useState('Imagination at Work.');
  const [editTittle, setEditTittle] = useState(false);
  const [description, setDescription] = useState(
    'This culture and theme resulted in a rebranding with the new tagline "Imagination at Work," which embodies the idea that imagination inspires the human initiative to thrive at what we do.'
  );
  const [descriptionSave, setDescriptionSave] = useState(
    'This culture and theme resulted in a rebranding with the new tagline "Imagination at Work," which embodies the idea that imagination inspires the human initiative to thrive at what we do.'
  );
  const [editDescription, setEditDescriptione] = useState(false);

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

  useEffect(() => {
    if (isMobile) {
      document.getElementById('root').style.display = 'block';
      document.getElementById('root').style.flexDirection = 'none';
    } else {
      document.getElementById('root').style.display = 'flex';
      document.getElementById('root').style.flexDirection = 'row-reverse';
    }
  }, [isMobile]);

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
        </ContentStyle>

        <MHidden width="mdDown">
          <SectionStyle>
            <Typography variant="h4" sx={{ px: 5, mt: 14, mb: 3, color: 'white', fontStyle: 'italic' }}>
              {tittle}
              {/* <IconButton color="primary" aria-label="edit tittle" component="label" sx={{ mb: 1, color: 'black' }}>
                <EditIcon fontSize="small" />
              </IconButton> */}
            </Typography>
            <Typography variant="body2" sx={{ px: 5, color: 'white', fontStyle: 'italic' }}>
              {description}
              {/* <IconButton color="primary" aria-label="edit tittle" component="label" sx={{ mb: 1, color: 'black' }}>
                <EditIcon fontSize="small" />
              </IconButton> */}
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
