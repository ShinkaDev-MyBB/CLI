"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _link = require("./link");

Object.keys(_link).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _link[key];
        }
    });
});

var _relink = require("./relink");

Object.keys(_relink).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _relink[key];
        }
    });
});

var _unlink = require("./unlink");

Object.keys(_unlink).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _unlink[key];
        }
    });
});

var _release = require("./release");

Object.keys(_release).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _release[key];
        }
    });
});
