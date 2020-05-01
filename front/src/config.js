export const API_URI = process.env.API_URI || 'http://localhost:3000';
export const API_USERS = process.env.API_USERS || '/v1/users';
export const API_ROLES = process.env.API_ROLES || '/v1/roles';
export const API_AUTH = process.env.API_AUTH || '/auth';
export const API_ACTIVATE = process.env.API_ACTIVATE || '/v1/users/activate';
export const API_CHANGE_PASSWORD = process.env.API_CHANGE_PASSWORD || '/v1/users/edit/password';
export const API_UPLOAD_PROFILE_PICTURE = process.env.API_UPLOAD_PROFILE_PICTURE || '/v1/users/edit/avatar';
export const API_READ_PROFILE_PICTURE = process.env.API_READ_PROFILE_PICTURE || '/v1/file';
export const API_OCR = process.env.API_OCR || '/v1/ocr';

export const ROLE_ADMINISTRATOR = 'ADMINISTRATOR';
export const ROLE_GUEST = 'GUEST';