/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Richard Scarrott @richardscarrott
*/

var webpack = require('webpack');
var DefinePlugin = webpack.DefinePlugin;

function SimpleDefinePlugin() {
    DefinePlugin.apply(this, arguments);
}

module.exports = SimpleDefinePlugin;

SimpleDefinePlugin.prototype = Object.create(DefinePlugin.prototype);

SimpleDefinePlugin.prototype.stringifyProps = function(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] === 'string' || obj[prop] instanceof Array) {
                obj[prop] = JSON.stringify(obj[prop]);
            } else if (obj[prop] instanceof RegExp) {
                obj[prop] = '' + obj[prop];
            } else if (typeof obj[prop] === 'object') {
                this.stringifyProps(obj[prop]);
            }
        }
    }
};

SimpleDefinePlugin.prototype.apply = function() {
    var definitions = this.definitions;
    this.stringifyProps(definitions);
    DefinePlugin.prototype.apply.apply(this, arguments);
};
