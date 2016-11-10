function addClass(ele, class_name) {
  if (!hasClass(ele, class_name))
    ele.className += " " + class_name;
}

function removeClass(ele, class_name) {
  if (!hasClass(ele, class_name)) return;
  var start = ele.className.indexOf(class_name);
  var end = start + class_name.length;
  ele.className = ele.className.substring(0, start - 1) + ele.className.substring(end);
}

function hasClass(ele, class_name) {
  return ele.className.indexOf(class_name) != -1;
}

function cloneMap(source) {
  var map = [];
  for (var i = 0; i < source.length; ++i) {
    var line = [];
    for (var j = 0; j < source[i].length; ++j) {
      line.push(source[i][j].clone());
    }
    map.push(line);
  }
  return map;
}

function calReverseNum(arr) {
  var res = 0;
  for (var i = 0; i < arr.length; ++i) {
    for (var j = i + 1; j < arr.length; ++j) {
      if (arr[i] > arr[j]) ++res;
    }
  }
  return res;
}
