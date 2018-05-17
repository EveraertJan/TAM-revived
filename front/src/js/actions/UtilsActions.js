export const UTILS_SHOW_MODAL_POST_CREATE = 'tellaboutme/UTILS_SHOW_MODAL_POST_CREATE';
export const UTILS_HIDE_MODAL_POST_CREATE = 'tellaboutme/UTILS_HIDE_MODAL_POST_CREATE';

export function modalShowPostCreateItem(data) {
  return {
    type: UTILS_SHOW_MODAL_POST_CREATE,
    data
  };
}
export function modalHidePostCreateItem(data) {
  return {
    type: UTILS_HIDE_MODAL_POST_CREATE,
    data
  };
}