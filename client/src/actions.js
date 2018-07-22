export const TOGGLE_CODE_DRAWER = 'TOGGLE_CODE_DRAWER';
export const SET_SELECTED_CODE_DRAWER_ITEM = 'SET_SELECTED_CODE_DRAWER_ITEM';
export const SHOW_APP_INIT = 'SHOW_APP_INIT';

export function toggleCodeDrawer (dispatch) {
  return dispatch({ type: TOGGLE_CODE_DRAWER });
}

export function setDrawerListItem (dispatch, item) {
  return dispatch({ type: SET_SELECTED_CODE_DRAWER_ITEM, data: item });
}

