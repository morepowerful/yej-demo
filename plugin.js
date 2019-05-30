function HellowToWebpack() {
}
HellowToWebpack.prototype.apply = function(compiler) {
    compiler.plugin('emit', function(compilation, callBack) {
        console.log(Object.keys(compilation.assets), 123);
        callBack();
    })
}

module.exports = {
    HellowToWebpack,
}