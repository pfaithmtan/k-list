import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function SongList() {
  const classes = useStyles();

  const [checked, setChecked] = useState([0]);
  const [values, setValues] = useState({
    title: '',
    artist: '',
  });
  const [songs, setSongs] = useState([]);

  const getSongs = () => {
    axios.get('/api/users/songs')
      .then((data) => {
        console.log(data);
        setSongs(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSongs();
  }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ title: '', artist: '' });

    axios.post('/api/users/songs', values)
      .then((data) => {
        console.log(data);
        getSongs();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form className={classes.form} noValidate autoComplete="off">
        <div>
          <TextField
            required
            id="outlined-required"
            label="Title"
            variant="outlined"
            value={values.title}
            onChange={handleChange('title')}
          />
          <TextField
            required
            id="outlined-required"
            label="Artist"
            variant="outlined"
            value={values.artist}
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
      <List className={classes.root}>
        {songs.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;
          const songTitle = value.title;
          const songArtist = value.artist;
          console.log('value:', value);

          return (
            <ListItem key={labelId} role={undefined} dense button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Song ${value.id}: ${songTitle} by ${songArtist}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
