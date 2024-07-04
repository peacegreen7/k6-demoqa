# EXAMPLE K6 PROJECT

## I. Installation
- Follow the instruction in this link to setup k6: https://k6.io/docs/getting-started/installation/
- Follow the instruction in this link install golang: https://go.dev/doc/install.
- Setup golang environment variables.
- ⚠ Warning: These changes on environment variables are only temporary, one must add these commands into bash profile for permanent changes
- Export env variables in Linux/Mac OS:
```
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```
### 1. Creating a project folder & initializing npm
```
$ mkdir ./{project-name} && \
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


### 3. Install babel 
``` 
$ npm install --save-dev @babel/core @babel/preset-env @babel/preset-typescript babel-loader 
```


### 4. Add config file 'babel.config.js' with code below:
```
module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript'
    ],
  };
```

### 5. Check Webpack Configuration
Ensure your Webpack configuration is set up to handle TypeScript files with Babel.

webpack.config.js
```
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


### 6. Build k6 executable file.
This command will produce a binary k6 file in root folder and another one in dist/linux folder. The latter one could be used to execute on Linux servers

Install npm packages: ```npm run install```

### 7. Getting Started
- Execute ```npm run build``` to create bundle files, there should be some *.js files created inside dist folder.
- ⚠ Warning: This command must be triggered every time there are changes in performance scripts.
- Execute ```k6 run dist/{file_name}.js``` to verify whether your installation works as expected.
- If scripts contain extensions, it is required to build an executable k6 binary file with command ```xk6 build --with [EXTENSION_REPOSITORY]```
- Conclusion, in order to build and execute, you can combine both steps into one to save time: ``` npm run build; k6 run dist/{file_name}.js ```


## Reference documents
- [Using k6 module](https://k6.io/docs/using-k6/modules/)


