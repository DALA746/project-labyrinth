import { createSlice } from '@reduxjs/toolkit';
import { ui } from "./ui";
import { GAME_URL } from '../components/utils/urls.js'
import { ACTION_URL } from '../components/utils/urls.js'

export const gamestate  = createSlice({
  name: 'gamestate ',
  initialState: {
		username: '',
    gameStatus: {},
		isLoading: false,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setGameStatus: (state, action) => {
      state.gameStatus= action.payload;
    },  
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  }
});

export const fetchGame = (username) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetch(GAME_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ username: username}),
    })
      .then((res) => res.json())
      .then((json) => {dispatch(gamestate.actions.setGameStatus(json))})
      .finally(() => dispatch(gamestate.actions.setLoading(false)))
  };
};

export const nextMove = (username, direction) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));

    fetch(ACTION_URL, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ username, type: 'move', direction }),
    })
      .then((res) => res.json())
      .then((json) => {dispatch(gamestate.actions.setGameStatus(json))})
      .finally(() => dispatch(gamestate.actions.setLoading(false)))
  };
};    



