// webpack.config.js
import { resolve } from 'path';

export const entry = '/index.js';
export const output = {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
};
export const module = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }
    ]
};
