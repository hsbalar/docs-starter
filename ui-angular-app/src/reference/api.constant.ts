export const BaseURL = `http://localhost:3000`;

export const FILES = `/api/files`;
export const CONTENTS = `/api/folders/contents`;
export const ELEMENTS = `/api/elements`;
export const INSTANCES = `/api/instances`;
export const ELEMENTS_INSTANCES = (keyOrId) => { return `/api/elements/${keyOrId}/instances` };