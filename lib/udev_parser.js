var udev_output_to_json = require('./udev_output_to_json');

function udev_parser(udev_output, callback) {
  var as_json = udev_output_to_json(udev_output);
  var pnpId = as_json.DEVLINKS.split(' ')[0];
  pnpId = pnpId.substring(pnpId.lastIndexOf('/') + 1);
  var port = {
    comName: as_json.DEVNAME,
    manufacturer: as_json.ID_VENDOR,
    serialNumber: as_json.ID_SERIAL,
    pnpId: pnpId,
    vendorId: '0x' + as_json.ID_VENDOR_ID,
    productId: '0x' + as_json.ID_MODEL_ID
  };

  return callback(null, port);
}

module.exports = udev_parser;
