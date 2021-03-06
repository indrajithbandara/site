const Webpack = require('webpack');

module.exports = ({ devServer }) => ({

    // The style of source-mapping, this can greatly speed-up bundling.
    devtool: 'cheap-module-source-map',

    // The application starting point
    entry: [
        // for hot-module-replacement
        `webpack-dev-server/client?http://${devServer.host}:${devServer.port}`,
        // For hot-style-replacement
        'webpack/hot/dev-server',
        // The actual starting point
        'index.js',
    ],

    // Instructions on how to output the bundle (extending base config)
    output: {
        // Determines the name of the bundle.
        filename: 'bundle.[name].js',
        // Determines the name of the chunk files loaded on-demand.
        chunkFilename: 'bundle.chunk.[name].js',
        // Include a comment in each bundle with the path of their corresponfing source
        pathinfo: true,
    },

    plugins: [
        // Add module names to factory functions so they appear in the browser profiler
        new Webpack.NamedModulesPlugin(),
        // Enable sending hot updates
        new Webpack.HotModuleReplacementPlugin()
    ],

});
