const path = require('path');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

//test if in production environment
const prod = process.argv.includes('prod');

//Main Directories
const build_directory  = path.join(__dirname, "build");
const source_directory = path.join(__dirname, "src");
const public_directory = path.join(__dirname, "public");

module.exports = {
    mode: prod? "production": "development",
    entry: {
        index: [
            path.join(source_directory, "index.ts"),
            path.join(source_directory, "style.scss")
        ]
    },
    devtool: prod?  undefined: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: 'style.css'}
                    },
                    'sass-loader'
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    experiments: {
        outputModule: true
    },
    output: { 
        filename: '[name].js',
        path: build_directory,
        library: {
            type: 'module'
        }
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                to: build_directory,
                from: public_directory
            }]
        })
    ],
    optimization: {
        minimize: prod,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    },
}