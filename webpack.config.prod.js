const path = require('path');
const cleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/app.js',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', {
                            'plugins': ['@babel/plugin-proposal-class-properties']
                        }]
                    }
                }
            }
        ]
    },
    output: {
        filename: '[contenthash].js',
        path: path.resolve(__dirname, 'assets', 'scripts'),
        publicPath: 'assets/scripts/'
    },
    plugins: [
        new cleanPlugin.CleanWebpackPlugin()
    ]
};