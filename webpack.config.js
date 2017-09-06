const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * 路径定义
 * @type {{}}
 */
const PATHS = {
    node_modulesPath: path.resolve('./node_modules'),
    libPath: path.resolve('src/static/lib')
}

module.exports = {
    resolve:{
        alias: {
            avalon2: path.resolve(PATHS.node_modulesPath, "avalon2/dist/avalon.js"),
            bootstrap: path.resolve(PATHS.node_modulesPath, 'bootstrap/dist'),
            jquery:  path.resolve(PATHS.libPath,  'jquery-1.12.4.js')
        },
        modules: [path.resolve(__dirname, "src/static/lib"), "node_modules", "src/tpl"]
    },
    entry:{
        // common: ['avalon2'],
        main: './src/main'
    },
    output:{
        filename:'[name].js',
        chunkFilename:'[name]-[chunkhash].js',
        path: path.resolve(__dirname, "dist")
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
            {test: /\.html$/, loader: 'html-loader'},
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&name=./static/images/[name].[ext]'},
            {test: /\.(woff|svg|eot|ttf)\??.*$/,loader:"url-loader",query:{limit : 1,name : "static/fonts/[name].[ext]"}},
            {test: /\.tpl$/, loader: 'text-loader'}
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new ExtractTextPlugin('./static/css/[name]-[chunkhash].min.css'),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new CleanWebpackPlugin(['dist'],{
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "avalon": "avalon2",
            "window.avalon": "avalon2"
        }),
        new CopyWebpackPlugin([{
            from: __dirname + '/src/static/lib/oldie',
            to: __dirname + '/dist/static/lib/oldie',
            toType: 'dir'
        }]),
    ],
    devServer: {
        historyApiFallback: true,
        inline: true,
        stats: { colors: true },
        port: 8000,
        host: '127.0.0.1',
        contentBase: 'dist/',
        proxy: {
            '/images': {
                target: 'http://wsbs.sc-n-tax.gov.cn',
                pathRewrite: {'^/images' : '/images'},
                changeOrigin: true
            }
        }
    }
};
/**
 * 扫描多入口js
 * @param globPath
 * @returns {{}}
 */
function entries (globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry).replace('src','./');
        basename = path.basename(entry, '.js');
        entries[path.join(dirname, basename)] = './' + entry;
    }

    return entries;
}