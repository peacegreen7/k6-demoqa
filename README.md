# EXAMPLE K6 PROJECT

## I. Installation
### 1. Setup k6 and Golang
- **k6**: Follow the instructions [here](https://k6.io/docs/getting-started/installation/).
- **Golang**: Follow the instructions [here](https://go.dev/doc/install) and set up the Golang environment variables:
```sh
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```

### 2. Creating a project folder & initializing npm
```sh
$ mkdir ./{project-name} && \
    cd "$_" && \
    npm init -y
```


### 3. Install the packages needed
```sh
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


### 4. Install babel 
```sh 
$ npm install --save-dev @babel/core @babel/preset-env @babel/preset-typescript babel-loader 
```


### 5. Add config file 'babel.config.js' with code below:
```js
module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript'
    ],
  };
```

### 6. Check Webpack Configuration
Ensure your ***`webpack.config.js`*** is set up to handle TypeScript files with Babel:

```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```


### 7. Build k6 executable file.
To produce a binary k6 file in root folder and another one in dist/linux folder

```sh 
$ npm run install
```

### 8. Getting Started
- Build the project:
```sh
$ npm run build
```
This will create bundle files in the dist folder. Run this command every time you change performance scripts.
- Verify the setup:
```sh
$ ./k6 run dist/{file_name}.js
```
- If using extensions, build an executable k6 binary file:
```sh
$ xk6 build --with [EXTENSION_REPOSITORY]
```
- Combine build and execution steps: 
```sh
$ npm run build; k6 run dist/{file_name}.js 
```


## Reference documents
- Using [k6](https://k6.io/docs/using-k6/modules/) module


