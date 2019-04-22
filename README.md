# docs-starter


docs-starter repo contains three applications

  * node api
  * ui-angular-app
  * ui-react-app

## How to run application

1. Run node (express instance) api : `It will run at http://localhost:4000`;

```
  cd docs-starter
  npm install
  npm start
```
2. Run angular app : `It will run angular app at http://localhost:4200`;

```
  cd ui-angular-app
  npm install
  npm start
```

3. Run react app : `It will run react app at http://localhost:3000`;

```
  cd ui-react-app
  npm install
  npm start
```


### Note that --- To access your documents you need to specify User key & Organization key in following files.
(Please add any documets related elements i.e box, googledrive, onedrive etc.)

> ui-angular-app/src/reference/api.constants.ts
```
export const User = `Your User key`;
export const Organization = `Your Organization key`;
```
> ui-react-app/src/reference/api.constants.js
```
export const User = `Your User key`;
export const Organization = `Your Organization key`;
```

### 1 . Node API is supports only for documents type elements
### 2 . OAuth2 login and creation of instance of element can be handled from UI app if User have login API for your console.
### 3 . To connect other elements API Can be extended
### 4 . Node API for documents has only required params,for optional can be extended further
