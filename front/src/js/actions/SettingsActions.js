export const SETTINGS_GET_WRITERS = 'tellaboutme/SETTINGS_GET_WRITERS';
export const SETTINGS_GET_WRITERS_SUCCESS = 'tellaboutme/SETTINGS_GET_WRITERS_SUCCESS';
export const SETTINGS_GET_WRITERS_FAILED = 'tellaboutme/SETTINGS_GET_WRITERS_FAILED';
export const SETTINGS_ADD_WRITER = 'tellaboutme/SETTINGS_ADD_WRITER';
export const SETTINGS_ADD_WRITER_SUCCESS = 'tellaboutme/SETTINGS_ADD_WRITER_SUCCESS';
export const SETTINGS_ADD_WRITER_FAILED = 'tellaboutme/SETTINGS_ADD_WRITER_FAILED';



export function settingsGetWriters(data) {
  return {
    type: SETTINGS_GET_WRITERS,
    data: {
      uuid: data
    }
  };
}

export function settingsAddWriter(data) {
  return {
    type: SETTINGS_ADD_WRITER,
    data
  };
}