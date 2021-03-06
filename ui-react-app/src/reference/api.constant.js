export const BaseURL = `http://localhost:4000`;

export const FILES = `/api/files`;
export const CONTENTS = `/api/folders/contents`;
export const ELEMENTS = `/api/elements`;
export const INSTANCES = `/api/instances`;
export const ELEMENTS_INSTANCES = (keyOrId) => { return `/api/elements/${keyOrId}/instances` };

export const User = ``;
export const Organization = ``;

export const currentElement = ''; 
export const currentInstance = null;