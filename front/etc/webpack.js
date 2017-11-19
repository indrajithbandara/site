import PATH from 'path';
import WebpackHtml from 'html-webpack-plugin';

export default ({ env, path }) => ({

    // The target environment for the compilation
    target: 'web',

    // The directory containing the entry files
    context: path.src,

    // Instructions on how to output the bundle
    output: {
        // Use JSONP for loading on-demand chunks, by adding a script tag.
        crossOriginLoading: false,
        // Where should the bundle be put?
        path: path.out,
        // The public URL for the root on the browser
        publicPath: '',
    },

    // Tell the module resolver how to behave
    resolve: {
        // If ommited, assume one of these extensions
        extensions: ['.js', '.jsx', '.json'],
        // if ommited, assume one of these paths
        modules: [path.src, 'node_modules'],
        // Whenever these aliases are used, resolve them to their counterpart.
        alias: {},
    },

    // Some libraries import Node modules (pointless in the browser) make dummies for'em.
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        dgram: 'empty',
        child_process: 'empty',
    },

    // Transformations applied to each file-type imported on the app
    module: {

        rules: [

            // Html files.
            // These are the index files that will be put at the root of the output folder
            {
                test: /\.html$/,
                include: PATH.join(path.src, 'index.html'),
                use: {
                    loader: 'html-loader',
                    options: {},
                },
            },

            {
                // js or jsx files
                test: /\.jsx?$/,
                include: [path.src],
                use: [
                    // Transpile with babel
                    {
                        loader: 'babel-loader',
                        options: {
                            // Don't use the babelrc files found on folder
                            // since they're use for transpiling webpack and npm.
                            babelrc: false,
                            presets: [
                                'react',
                                ['env', { // available from @gik/npm
                                    targets: {
                                        browsers: ['last 2 versions'],
                                    },
                                }],
                                'stage-2', // available from @gik/npm
                            ],
                            // Extra functionality
                            plugins: [
                                // Transform JSX whenever whenever pragma is found.
                                ['transform-react-jsx', { pragma: 'React' }],
                                'inline-import', // allows importing graphql files
                            ],
                        },
                    },
                    // Parse Javascript before transpiling
                    {
                        loader: 'eslint-loader',
                        options: {
                            failOnError: true, // stop execution for errors
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        // Outputs an html file based upon a template (specified on the html-loader)
        new WebpackHtml({
            // The filename to use for the generated html
            filename: 'index.html',
            // Use this file as a template for the generated html
            template: PATH.join(path.src, 'index.html'),
            // Inject generated resources inside the body element of the html
            inject: 'body',
            // Append hashes to every generated resources to avoid caching them
            hash: env !== 'production',
            // Only emit the file when it hasn't changed between compiles
            cache: env !== 'production',
            // Write error details on the webpage
            showErrors: true,
        }),
    ],
});
