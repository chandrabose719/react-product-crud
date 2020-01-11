const path = require("path");

var SRC_DIR = path.resolve(__dirname, "src");
var DIST_DIR = path.resolve(__dirname, "dist");

const config = {
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        rules: [{
            test:/\.(js|jsx)$/,
            loader: "babel-loader",
            query: {
                presets: ["@babel/preset-react"],
                plugins: ["@babel/plugin-proposal-class-properties"]
            }
        }]
    }
};

 
module.exports = config;