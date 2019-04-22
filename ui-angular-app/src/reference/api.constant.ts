export const BaseURL = `http://localhost:4000`;

export const User = ``;
export const Organization = ``;

export const FILES = `/api/files`;
export const CONTENTS = `/api/folders/contents`;
export const ELEMENTS = `/api/elements`;
export const INSTANCES = `/api/instances`;
export const ELEMENTS_INSTANCES = (keyOrId) => { return `/api/elements/${keyOrId}/instances` };