const dev = process.env.NODE_ENV !== "production";
const path = require("path");

module.exports = {
    mode: dev ? "development" : "production",
    context: path.join(__dirname, "src"),
    devtool: dev ? "none" : "source-map",
    entry: {
        app: "./client.js",
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
    },
    node: {
        fs: "empty"
    }
}
