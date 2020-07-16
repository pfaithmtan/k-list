import React, { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

function DevelopedBy() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {' 𝄞 DevelopedBy '}
      <Link color="inherit" href="https://github.com/pfaithmtan">
        Faith Tan
      </Link>
      {' 𝄢 '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?karaoke)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn() {
  const classes = useStyles();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ email: '', password: '' });

    axios.post('/api/login', values)
      .then((data) => {
        window.location = data.request.responseURL;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      {/* comment out above line */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Link href="/">
            <img src="https://cdn0.iconfinder.com/data/icons/love-and-romance-vol-3/48/105-512.png" alt="" height="40px" width="40px" />
          </Link>
          <Typography component="h1" variant="h5">
            Log in to your account
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange('password')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Log In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                {'Don\'t have an account? '}
                <ReactRouterLink to="/signUp" variant="body2">
                  Sign up!
                </ReactRouterLink>
              </Grid>
            </Grid>
            <Box mt={5}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link href="https://www.linkedin.com/in/pfaithmtan/">
                  <LinkedInIcon />
                </Link>
                <Link href="https://github.com/pfaithmtan">
                  <GitHubIcon />
                </Link>
              </div>
              <DevelopedBy />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
