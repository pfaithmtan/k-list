import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

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
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    backgroundColor: theme.palette.background.default,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    // backgroundColor: theme.palette.background.default,
    padding: theme.spacing(6),
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.background.paper : theme.palette.background.paper,
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Home Page of App
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
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
        <Container className={classes.cardGrid} maxWidth="md">
          <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe3%2F22%2Fdb%2Fe322db3ad04ed97760e5fa1b238803ed.png&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F508414245419688919%2F&tbnid=mz7OrQDKpC3wdM&vet=12ahUKEwjV99v0l8rnAhUOtJ4KHQc0DJ0QMygdegQIARBm..i&docid=d3BR_iEa6fvvbM&w=256&h=500&q=dalmatian%20101&ved=2ahUKEwjV99v0l8rnAhUOtJ4KHQc0DJ0QMygdegQIARBm" alt="background" />
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <DevelopedBy />
      </footer>
      {/* End footer */}
    </MuiThemeProvider>
  );
}
