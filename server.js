import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';

const APP_PORT = 3000;

var compiler = webpack(webpackConfig);
var app = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    publicPath: webpackConfig.output.path,
    stats: {colors: true}
});
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
});
