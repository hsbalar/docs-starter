export const BASE_URL = `https://staging.cloud-elements.com/elements/api-v2`;
export const FILES = `/files`;

export const FOLDERS_CONTENTS = `/folders/contents`;
export const FOLDERS_CONTENTS_BY_ID = (id) => { return `/folders/${id}/contents` };

export const ELEMENTS = `/elements`;
export const INSTANCES = `/instances`;
export const GET_ELEMENTS_INSTANCES = (keyOrId) => { return `/elements/${keyOrId}/instances` };