const path = require('path');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

//test if in dev environment
const dev = process.argv.includes('dev');

const minify = !dev ?{
    minimize: true,
    minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin()
    ]
}: undefined;

module.exports = {
    mode: dev? "development": "production",
    entry: {
        "index": [
            path.join(__dirname, "src", "index.ts"),
            path.join(__dirname, "public", "index.css")
        ],
        "firestore": path.join(__dirname, "src", "Firestore.ts")
    },
    devtool: dev? 'source-map': undefined,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader: "file-loader",
                        options: {name: 'index.min.css'}
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: { 
        filename: '[name].js',
        path: path.join(__dirname, "public")
    },
    optimization: minify
}