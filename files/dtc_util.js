
function M_RGB(t_r, t_g, t_b) {
  this.r = t_r;
  this.g = t_g;
  this.b = t_b;
};

M_RGB.prototype.toString = function getString() {
  ret = "#";
  ret += this.r.toString(16).length == 1 ? ("0" + this.r.toString(16)) : this.r.toString(16);
  ret += this.g.toString(16).length == 1 ? ("0" + this.g.toString(16)) : this.g.toString(16);
  ret += this.b.toString(16).length == 1 ? ("0" + this.b.toString(16)) : this.b.toString(16);
  console.log(ret);
  return ret;
};

function getRandomRGB() {
  var ret = new M_RGB();
  ret.r = Math.floor(Math.random() * 256);
  ret.g = Math.floor(Math.random() * 256);
  ret.b = Math.floor(Math.random() * 256);
  return ret;
}

function highlightRGB(color) {
  var ret = new M_RGB();
  ret.r = color.r + 10 > 256 ? 256 : color.r + 10;
  ret.g = color.g + 10 > 256 ? 256 : color.g + 10;
  ret.b = color.b + 10 > 256 ? 256 : color.b + 10;
  return ret;
}
