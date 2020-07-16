import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

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

export default function SongList({ query }) {
  const classes = useStyles();

  const [checked, setChecked] = useState([]);
  const [userSongs, setUserSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  const getUserSongs = () => {
    axios.get('/api/users/songs')
      .then((data) => {
        // console.log(data);
        setUserSongs(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFilteredSongs = () => {
    axios.get(`/api/songs?query=${query}`)
      .then((data) => {
        setFilteredSongs(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserSongs();
    getFilteredSongs();
  }, [query]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log('newchecked:', newChecked);

    setChecked(newChecked);
  };

  const addSongToPlaylist = (event) => {
    console.log('event:', event.target.id);

    axios.post('/api/users/songs', { song_id: event.target.id })
      .then((data) => {
        getUserSongs();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteSong = (event) => {
    axios.delete('/api/users/songs', {
      params: { song_id: event.target.id },
    })
      .then((data) => {
        getUserSongs();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <List className={classes.root}>
        {userSongs.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;
          const songTitle = value.title;
          const songArtist = value.artist;
          // console.log('value:', value);

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
              <ListItemText id={value.id} primary={`Song ${value.id}: ${songTitle} by ${songArtist}`} />
              <ListItemSecondaryAction id={value.id} onClick={deleteSong} style={{ cursor: 'pointer' }}>
                <IconButton id={value.id} edge="end" aria-label="comments" style={{ pointerEvents: 'none' }}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <List className={classes.root}>
        {filteredSongs.map((value) => {
          const labelId = `id-${value.id}`;
          const songTitle = value.title;
          const songArtist = value.artist;
          // console.log('value:', value);

          return (
            <ListItem key={labelId} role={undefined} dense button>
              <ListItemText id={labelId} primary={`${songTitle} - ${songArtist}`} />
              <ListItemSecondaryAction id={value.id} onClick={addSongToPlaylist} style={{ cursor: 'pointer' }}>
                <IconButton edge="end" aria-label="comments" style={{ pointerEvents: 'none' }}>
                  <PlaylistAddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

SongList.propTypes = {
  query: PropTypes.string,
};

SongList.defaultProps = {
  query: '',
};
