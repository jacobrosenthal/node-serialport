var async = require('async');
var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');
var udev_parser = require('./udev_parser');

function listUnixSerialId(callback) {
  var dirName = '/dev/serial/by-id';
  
  fs.readdir(dirName, function (err, files) {
    if (err) {
      return callback(err);
    }

    async.map(files, function (file, callback) {
      var fileName = path.join(dirName, file);
      fs.readlink(fileName, function (err, link) {
        if (err) {
          return callback(err);
        }

        link = path.resolve(dirName, link);
        exec('/sbin/udevadm info --query=property -p $(/sbin/udevadm info -q path -n ' + link + ')', function (err, stdout) {
          if (err) {
            return callback(err);
          }

          udev_parser(stdout, callback);
        });
      });
    }, callback);
  });
}

module.exports = listUnixSerialId;
