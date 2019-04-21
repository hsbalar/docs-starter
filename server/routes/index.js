import multer from "multer";
import path from "path";
import * as middleware from '../middleware/middleware.js';

let upload = multer({ dest: 'uploads/' })

export default function (app) {

  app.get('/api/folders/contents', middleware.getFoldersContent);
  app.get('/api/folders/contents/:id', middleware.getFoldersContentById);
  app.get('/api/files/:id', middleware.getFileById);
  app.get('/api/elements', middleware.getElements);
  app.get('/api/elements/:id', middleware.getElements);
  app.get('/api/instances', middleware.getInstances);
  
  app.post('/api/files', upload.single('file'), middleware.uploadFile);
};
