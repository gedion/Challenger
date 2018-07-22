export const TOGGLE_CODE_DRAWER = 'TOGGLE_CODE_DRAWER';
export const SET_SELECTED_CODE_DRAWER_ITEM = 'SET_SELECTED_CODE_DRAWER_ITEM';
export const SHOW_APP_INIT = 'SHOW_APP_INIT';
export const TOGGLE_PROGRESS_BAR = 'TOGGLE_PROGRESS_BAR';
import axios from 'axios';

export function toggleCodeDrawer (dispatch) {
  return dispatch({ type: TOGGLE_CODE_DRAWER });
}


export function toggleProgressBar (dispatch) {
  return dispatch({ type: TOGGLE_PROGRESS_BAR });
}

export function setDrawerListItem (dispatch, item) {
    toggleProgressBar(dispatch);
    return axios.get('/api/run/cryptSolution')
    .then((res) => {
      toggleProgressBar(dispatch);
      dispatch({ type: SET_SELECTED_CODE_DRAWER_ITEM,
        data: {
          runResult: res.data ,
          selectedCodeDrawerItem: item
        }
      });
    }).catch(error => {
      toggleProgressBar(dispatch);
      dispatch({ type: SET_SELECTED_CODE_DRAWER_ITEM,
        data: {
          selectedCodeDrawerItem: item
        }
      });
    });
}

