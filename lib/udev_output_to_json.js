function udev_output_to_json(output) {
  var result = {};
  var lines = output.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line !== '') {
      var line_parts = lines[i].split('=');
      result[line_parts[0].trim()] = line_parts[1].trim();
    }
  }
  return result;
}

module.exports = udev_output_to_json;
