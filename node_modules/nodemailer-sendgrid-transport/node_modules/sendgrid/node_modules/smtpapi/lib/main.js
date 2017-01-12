(function() {
"use strict";

var package_json  = require('./../package.json');

var smtpapi = function smtpapi(header) {
  this.version = package_json.version;

  header = header || {};
  this.header = {};
  this.header.to = header.to || [];
  this.header.sub = header.sub || {};
  this.header.unique_args = header.unique_args || {};
  this.header.category = header.category || [];
  this.header.section = header.section || {};
  this.header.filters = header.filters || {};
  this.header.send_at = header.send_at || '';
  this.header.send_each_at = header.send_each_at || [];
  this.header.asm_group_id = header.asm_group_id || {};
  this.header.ip_pool = header.ip_pool || '';
};

smtpapi.prototype.addTo = function(to) {
  if (to instanceof Array) {
    this.header.to = this.header.to.concat(to);
  } else {
    this.header.to.push(to);
  }
};

smtpapi.prototype.setTos = function(to) {
  if (to instanceof Array) {
    this.header.to = to;
  } else {
    this.header.to = [to];
  }
};

smtpapi.prototype.addSubstitution = function(key, val) {
  if (this.header.sub[key] === undefined) this.header.sub[key] = [];
  if (val instanceof Array) {
    this.header.sub[key] = this.header.sub[key].concat(val);
  } else {
    this.header.sub[key].push(val);
  }
};

smtpapi.prototype.setSubstitutions = function(subs) {
  this.header.sub = subs;
};

smtpapi.prototype.addUniqueArg = function(key, val) {
  this.header.unique_args[key] = val;
};

smtpapi.prototype.setUniqueArgs = function(val) {
  this.header.unique_args = val;
};

smtpapi.prototype.addCategory = function(cat) {
  if (cat instanceof Array) {
    this.header.category.concat(cat);
  } else {
    this.header.category.push(cat);
  }
};

smtpapi.prototype.setCategories = function(cats) {
  if (cats instanceof Array) {
    this.header.category = cats;
  } else {
    this.header.category = [cats];
  }
};

smtpapi.prototype.addSection = function(sec, val) {
  this.header.section[sec] = val;
};

smtpapi.prototype.setSections = function(sec) {
  this.header.section = sec;
};

smtpapi.prototype.addFilter = function(filter, setting, val) {
  if (this.header.filters[filter] === undefined) {
    this.header.filters[filter] = {'settings': {}};
  }
  this.header.filters[filter].settings[setting] = val;
};

smtpapi.prototype.setFilters = function(filters) {
  this.header.filters = filters;
};

smtpapi.prototype.setSendAt = function(send_at) {
  this.header.send_each_at = [];
  this.header.send_at = send_at;
};

smtpapi.prototype.setSendEachAt = function(send_each_at) {
  this.header.send_at = '';
  this.header.send_each_at = send_each_at
};

smtpapi.prototype.addSendEachAt = function(send_each_at) {
  this.header.send_at = '';
  this.header.send_each_at.push(send_each_at);
};

smtpapi.prototype.setASMGroupID = function(asm_group_id) {
  this.header.asm_group_id = asm_group_id;
};

smtpapi.prototype.setIpPool = function(ip_pool) {
  this.header.ip_pool = ip_pool;
};

smtpapi.prototype.jsonObject = function() {
  var header = {};
  for (var key in this.header) {
    if (this.header.hasOwnProperty(key) && (typeof this.header[key] === 'object' && Object.keys(this.header[key]).length) ||
                                            typeof this.header[key] === 'number' && this.header[key] ||
                                            typeof this.header[key] === 'string' && this.header[key]) {
      header[key] = this.header[key];
    }
  }

  return header;
};

smtpapi.prototype.jsonString = function() {
  var json_object = this.jsonObject();
  var json_string = JSON.stringify(json_object);

  return this.escapeUnicode(json_string);
};

smtpapi.prototype.escapeUnicode = function(str) {
  return str.replace(/[^ -~]/g, function(m0) {
    var code = m0.charCodeAt(0);
    return '\\u' + ((code < 0x10)? '000' :
                    (code < 0x100)? '00' :
                    (code < 0x1000)? '0' : '') + code.toString(16);
  });
};

module.exports = smtpapi;
}());
