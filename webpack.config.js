const path = require('path');

//test if in dev environment
const dev = process.argv.includes('-d');

module.exports = {
    mode: dev? "development": "production",
    entry: path.join(__dirname, "src", "index.ts"),
    devtool: dev? 'source-map': undefined,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: { 
        filename: 'index.js',
        path: path.join(__dirname, "public")
    },
}