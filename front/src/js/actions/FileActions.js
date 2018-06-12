export const FILE_UPLOAD_IMAGE = 'tam/FILE_UPLOAD_IMAGE';
export const FILE_UPLOAD_IMAGE_SUCCESS = 'tam/FILE_UPLOAD_IMAGE_SUCCESS';
export const FILE_UPLOAD_IMAGE_FAILED = 'tam/FILE_UPLOAD_IMAGE_FAILED';

export function FileUploadImage(payload) {
  return {
    type: FILE_UPLOAD_IMAGE,
    payload
  }
}
