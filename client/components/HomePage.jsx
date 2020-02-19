import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

function DevelopedBy() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {' 𝄞 Developed by '}
      <Link color="inherit" href="https://github.com/pfaithmtan">
        Faith Tan
      </Link>
      {' 𝄢♪♫♩♬ '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(8, 0, 6),
    color: 'black',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    backgroundColor: theme.palette.background.default,
  },
  footer: {
    // backgroundColor: theme.palette.background.default,
    padding: theme.spacing(6),
    backgroundColor: '#3f51b5',
    // theme.palette.type === 'dark' ? theme.palette.background.paper : theme.palette.background.paper,
    color: 'black',
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src="https://cdn0.iconfinder.com/data/icons/love-and-romance-vol-3/48/105-512.png" alt="" height="40px" width="40px" />
            <Typography variant="h6" color="inherit" noWrap>
              K List
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="" gutterBottom>
              Top 10 Songs from 2010-2019
            </Typography>
            <Typography variant="h5" align="center" color="" paragraph>
              <div style={{ color: 'dimgrey' }}>
                Create a karaoke list from the hits of the decade.
              </div>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <ReactRouterLink to="/signUp">
                    <Button variant="contained" color="primary">
                      Sign Up
                    </Button>
                  </ReactRouterLink>
                </Grid>
                <Grid item>
                  <ReactRouterLink to="/logIn">
                    <Button variant="outlined" color="primary">
                      Log In
                    </Button>
                  </ReactRouterLink>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <div style={{ backgroundColor: 'lightgrey' }}>
          <Container className={classes.cardGrid} maxWidth="md">
            <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe3%2F22%2Fdb%2Fe322db3ad04ed97760e5fa1b238803ed.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F508414245419688919%2F&tbnid=mz7OrQDKpC3wdM&vet=12ahUKEwjV99v0l8rnAhUOtJ4KHQc0DJ0QMygdegQIARBm..i&docid=d3BR_iEa6fvvbM&w=256&h=500&q=dalmatian%20101&ved=2ahUKEwjV99v0l8rnAhUOtJ4KHQc0DJ0QMygdegQIARBm" alt="" />
          </Container>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="" component="p">
          <div style={{ color: '#efecec' }}>
            <Link href="https://www.linkedin.com/in/pfaithmtan/">
              <LinkedInIcon style={{ color: 'white' }} />
            </Link>
            <Link href="https://github.com/pfaithmtan">
              <GitHubIcon style={{ color: 'white' }} />
            </Link>
          </div>
        </Typography>
        <DevelopedBy />
      </footer>
      {/* End footer */}
    </MuiThemeProvider>
  );
}
