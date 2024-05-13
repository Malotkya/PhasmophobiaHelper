const path = require('path');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

//test if in production environment
const prod = process.argv.includes('prod');

module.exports = {
    mode: prod? "production": "development",
    entry: {
        index: [
            path.join(__dirname, "src", "index.ts"),
            path.join(__dirname, "src", "style.scss")
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
        path: path.join(__dirname, "public"),
        library: {
            type: 'module'
        }
    },
    optimization: {
        minimize: prod,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    },
}