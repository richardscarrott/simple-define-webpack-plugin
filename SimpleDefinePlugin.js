/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
*/

var webpack = require('webpack');
var DefinePlugin = webpack.DefinePlugin;

function SimpleDefinePlugin() {
    DefinePlugin.apply(this, arguments);
}

module.exports = SimpleDefinePlugin;

SimpleDefinePlugin.prototype = Object.create(DefinePlugin.prototype);

SimpleDefinePlugin.prototype.stringifyProps = function(obj) {
    // TODO: check array behaviour, might need to stringify?
    // TODO: check regex behaviour, might present itself as object?
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] === 'object') {
                this.stringifyProps(obj[prop]);
            } else if (typeof obj[prop] === 'string') {
                obj[prop] = JSON.stringify(obj[prop]);
            }
        }
    }
};

SimpleDefinePlugin.prototype.apply = function() {
    var definitions = this.definitions;
    this.stringifyProps(definitions);
    DefinePlugin.prototype.apply.apply(this, arguments);
};