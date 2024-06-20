import { createSlice } from '@reduxjs/toolkit'

const trackListSlice = createSlice({
  name: 'currentTrack',
  initialState: {
    fullTrackList: [],
    trackList: [],
    currentTrackIndex: 0,
    track: {},
    paused: true,
  },
  reducers: {
    changeFullTrackList(state, action) {
      state.fullTrackList = action.payload
    },
    changeTrack(state, action) {
      state.trackList = action.payload.list
      state.currentTrackIndex = action.payload.index
      if (state.currentTrackIndex >= state.trackList.length)
        state.currentTrackIndex = 0
      state.track = state.trackList[state.currentTrackIndex]
    },
    changeTrackList(state, action) {
      state.trackList = action.payload
      if (state.currentTrackIndex >= state.trackList.length)
        state.currentTrackIndex = 0
      state.track = state.trackList[state.currentTrackIndex]
    },
    changeTrackIndex(state, action) {
      state.currentTrackIndex = action.payload
      if (state.currentTrackIndex >= state.trackList.length)
        state.currentTrackIndex = 0
      state.track = state.trackList[state.currentTrackIndex]
    },
    toNextTrack(state) {
      state.currentTrackIndex++
      if (state.currentTrackIndex >= state.trackList.length)
        state.currentTrackIndex = 0
      state.track = state.trackList[state.currentTrackIndex]
    },
    toPrevTrack(state) {
      state.currentTrackIndex--
      if (state.currentTrackIndex < 0)
        state.currentTrackIndex = state.trackList.length - 1
      state.track = state.trackList[state.currentTrackIndex]
    },
    playTrack(state) {
      state.paused = false
    },
    pauseTrack(state) {
      state.paused = true
    },
  },
})

export default trackListSlice.reducer
export const {
  changeFullTrackList,
  changeTrack,
  changeTrackList,
  changeTrackIndex,
  toNextTrack,
  toPrevTrack,
  playTrack,
  pauseTrack,
} = trackListSlice.actions
