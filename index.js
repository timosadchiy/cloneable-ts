"use strict";

var Cloneable = /** @class */ (function () {
    function Cloneable(args) {
        applyArgs(this, args);
    }

    Cloneable.prototype.clone = function (args) {
        return cloneProperties(this, args || {});
    };
    Cloneable.clone = cloneProperties;
    return Cloneable;
}());

function applyArgs(obj, args) {
    for (var key in args) {
        if (args.hasOwnProperty(key)) {
            obj[key] = args[key];
        }
    }
}

function deepClone(oldObj) {
    var newObj;
    // Handle the 3 simple types, and null or undefined
    if (null == oldObj || "object" !== typeof oldObj) {
        return oldObj;
    }
    // Handle Date
    if (oldObj instanceof Date) {
        newObj = new Date();
        newObj.setTime(oldObj.getTime());
        return newObj;
    }
    // Handle Array
    if (oldObj instanceof Array) {
        newObj = [];
        for (var i = 0, len = oldObj.length; i < len; i++) {
            newObj[i] = deepClone(oldObj[i]);
        }
        return newObj;
    }
    // Handle Map
    if (oldObj instanceof Map) {
        newObj = new Map(oldObj);
        return newObj;
    }
    // Handle Object
    if (oldObj instanceof Object) {
        newObj = Object.create(oldObj);
        for (var attr in oldObj) {
            if (oldObj.hasOwnProperty(attr)) {
                newObj[attr] = deepClone(oldObj[attr]);
            }
        }
        return newObj;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function cloneProperties(originalObj, cloneArgs) {
    var args = cloneArgs || {};
    var constructedObj = Object.create(originalObj);
    for (var i in originalObj) {
        if (originalObj.hasOwnProperty(i)) {
            if (args[i] != null) {
                constructedObj[i] = deepClone(args[i]);
            } else {
                constructedObj[i] = deepClone(originalObj[i]);
            }
        }
    }
    return constructedObj;
}

exports.Cloneable = Cloneable;
exports.clone = cloneProperties;
