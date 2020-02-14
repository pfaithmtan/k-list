import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function SongList() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    title: '',
    artist: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/users/songs', values)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          required
          id="outlined-required"
          label="Title"
          variant="outlined"
          onChange={handleChange('title')}
        />
        <TextField
          required
          id="outlined-required"
          label="Artist"
          variant="outlined"
          onChange={handleChange('artist')}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Add Song!
        </Button>
      </div>
    </form>
  );
}
