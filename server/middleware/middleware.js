import _ from "lodash";
import axios from "axios";
import superagent from "superagent";
import path from "path";
import fs from "fs";

import { BASE_URL,
  FOLDERS_CONTENTS,
  FOLDERS_CONTENTS_BY_ID,
  ELEMENTS, FILES, INSTANCES } from "../config/constants";

axios.defaults.baseURL = BASE_URL;

export function getFoldersContent(req, res) {  
  if (!req.query.path) {
    return res.status(500).send({error: 'Please provide path' });
  }
  axios.get(FOLDERS_CONTENTS, {
    params: { path: req.query.path },
    headers: { Authorization: req.headers['authorization'] }
  }).then(response => {
    return res.json({ data : response.data });
  }).catch(err => {    
    return res.status(500).send({error: err.response.data});
  })
}

export function getFoldersContentById(req, res) {
  if (!req.params.id) {
    return res.status(500).send({error: 'Please provide folder id' });
  }
  axios.get(FOLDERS_CONTENTS_BY_ID(req.params.id), {
    headers: { Authorization: req.headers['authorization'] }
  }).then(response => {
    return res.json({ data : response.data });
  }).catch(err => {
    return res.status(500).send({err: err.response.data });
  })
}

export function getFileById(req, res) {
  if (!req.params.id) {
    return res.status(500).send({error: 'Please provide file id' });    
  }
  let id = req.params.id;
  axios.get(`${FILES}/${id}`, {
    headers: { Authorization: req.headers['authorization'] }
  }).then(response => {
    res.set(response.headers);
    return res.send(response.data);
  }).catch(err => {
    return res.status(500).send({error: err.response.data || {}});
  })
}

export function uploadFile(req, res) {
  if (!req.query.path) {
    return res.status(500).send({error: 'Please provide upload directory path' });    
  }
  let agent = superagent.agent();
  let queryPath = req.query.path == '/' ? '' : req.query.path;
  agent.post(`${BASE_URL}${FILES}?path=${queryPath}/${req.file.originalname}`)
    .attach('file', path.resolve(req.file.path))
    .set('Authorization', req.headers['authorization'])
    .end((err, response) => {
      if (err) {
        return res.status(500).send({err: err.response});
      }
      fs.unlink(path.resolve(req.file.path), () => {});
      return res.send(response.body);
    });
}

export function getElements(req, res) {
  let url = `${ELEMENTS}`;
  if (req.params.id) {
    url += `/${req.params.id}`;
  }
  axios.get(url, {
    headers: { Authorization: req.headers['authorization'] }
  }).then(response => {
    return res.json({ data: response.data });
  }).catch(err => {
    return res.status(500).send({error: err.response.data});
  })
}

export function getInstances(req, res) {
  axios.get(`${INSTANCES}`, {
    headers: { Authorization: req.headers['authorization'] }
  }).then(response => {
    return res.json({ data: response.data });
  }).catch(err => {
    return res.status(500).send({error: err.response.data || {}});
  })
}
