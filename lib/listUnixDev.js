var async = require('async');
var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');
var udev_parser = require('./udev_parser.js');

function listUnixDev(callback) {
  var dirName = '/dev';

  fs.readdir(dirName, function (err, files) {
    if (err) {
      return callback(err);
    }

    //get only serial port  names
    for (var i = files.length - 1; i>=0; i--){
      if ((files[i].indexOf('ttyACM') === -1 && files[i].indexOf('ttyS') === -1 && files[i].indexOf('ttyUSB') === -1) || !fs.statSync(path.join(dirName,files[i])).isCharacterDevice()){
        files.splice(i,1);
      }
    }

    async.map(files, function (file, callback) {
      var fileName = path.join(dirName, file);
      exec('/sbin/udevadm info --query=property -p $(/sbin/udevadm info -q path -n ' + fileName + ')', function (err, stdout) {
        if (err) {
          return callback(err);
        }
      
        udev_parser(stdout, callback);
      });
    }, callback);
  });
}

module.exports = listUnixDev;
