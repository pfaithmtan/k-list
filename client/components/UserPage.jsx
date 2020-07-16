import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import SongList from './SongList';
import SearchBar from './SearchBar';

function DevelopedBy() {
  return (
    <Typography align="center" variant="body2" color="textSecondary">
      {' 𝄞 Developed by '}
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
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  const [logout, setLogout] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
  });
  const [query, setQuery] = useState('');

  const updateQuery = _.debounce((searchQuery) => {
    setQuery(searchQuery);
  }, 300);

  const handleLogout = (event) => {
    event.preventDefault();
    setLogout(true);

    axios.get('/api/logout')
      .then((data) => {
        window.location = data.request.responseURL;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userLoggedIn = () => {
    axios.get('/test')
      .then((data) => {
        if (data.data) {
          setPageLoaded(true);
          setUserInfo({
            firstName: data.data.firstName,
            lastName: data.data.lastName,
          });
        } else {
          window.location = 'http://localhost:3000/';
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    userLoggedIn();
  }, []);

  if (!pageLoaded) {
    return (
      <div />
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography align="center" variant="h2" component="h1" gutterBottom>
          {`${userInfo.firstName}'s K List!`}
        </Typography>
        <Typography align="center" variant="h5" component="h2" gutterBottom>
          Add songs and start singing!
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <SearchBar updateQuery={updateQuery} />
        </div>
        <SongList query={query} />
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography align="center" variant="body1">
            Shameless plug:
            <Link href="https://www.linkedin.com/in/pfaithmtan/">
              <LinkedInIcon />
            </Link>
            <Link href="https://github.com/pfaithmtan">
              <GitHubIcon />
            </Link>
          </Typography>
          <DevelopedBy />
        </Container>
      </footer>
    </div>
  );
}
