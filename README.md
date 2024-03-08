# EXAMPLE K6 PROJECT

## I. Installation

### 1. Creating a project folder & initializing npm
```
$ mkdir ./example-project && \
    cd "$_" && \
    npm init -y
```


### 2. Install the packages needed
```
$ npm install --save-dev \
    webpack \
    webpack-cli \
    @types/k6 \
    babel-loader \
    @babel/core \
    @babel/preset-env \
    core-js \
    clean-webpack-plugin \
    copy-webpack-plugin \
    webpack-glob-entries
```


### 3. Configuring Webpack

Set up a webpack.config.js file


### 4. Command

```
npm run build; k6 run dist/{file_name}.js
```


## Reference documents
- [Using k6 module](https://k6.io/docs/using-k6/modules/)


