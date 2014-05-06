var cache = function() {
  var cacheDb = null;
  var initialized = false;

  var get = function(url, callback, options) {
    if(!initialized) { initialize(); }
    if(typeof options === "undefined") { options = {}; }
    if(typeof options.params === "undefined") { options.params = ''; }
    if(typeof options.type === "undefined") { options.type = ''; }
    if(typeof options.page === "undefined") { options.page = 1; }
    if(typeof options.offline === "undefined") { options.offline = false; }
    if(typeof options.fallback === "undefined") { options.fallback = true; }
    if(typeof options.save === "undefined") { options.save = true; }
    if(typeof options.ajaxType === "undefined") { options.ajaxType = 'POST'; }

    if(options.offline === true) {
      getFromCache([url, options.type, options.page], function(results) {
        callback(results);
      });
    } else {
      getFromOnline(url, options.params, function(results) {
        if(typeof results === 'undefined' && options.fallback === true) {
          options.offline = true;
          get(url, callback, options);
        } else {
          if(options.save === true) {
            set(url, results, options);
          }
          callback(results);
        }
      },
      options.ajaxType);
    }
  };

  var getFromCache = function (values, callback) {
    query('SELECT * FROM cache WHERE url=? AND type=? AND page=?;', values, function(results) {
      if(results.success === true && results.rowsAffected > 0) {
        callback(JSON.parse(results.data.rows.item(0).data));
      } else {
        callback({success: false});
      }
    });
  };

  var getFromOnline = function (url, params, callback, type) {
    $.ajax({
      type: type,
      url: url,
      dataType: 'json',
      data: params,
      async: true,
      success: function(json) {
        callback(json);
      },
      error: function(response) {
        console.log('Ajax Error- url=' + url + ' data=' + JSON.stringify(params) + ' type=' + type);
        callback(response);
      }
    });
  };

  var set = function(url, json, options) {
    getFromCache([url, options.type, options.page], function(results) {
      if(results.success === true) {
        query('UPDATE cache SET json=? WHERE url=? AND type=? AND page=?',
          [JSON.stringify(json), url, options.type, options.page], function() {
        });
      } else {
        query('INSERT INTO cache (url, type, page, data) VALUES(?, ?, ?, ?);',
          [url, options.type, options.page, JSON.stringify(json)], function(results) {
            if(results.success === true) {
            } else {
              console.log('Error inserting = ' + results.data);
            }
        });
      }
    });
  };

  var initialize = function() {
    if(cacheDb === null) {
      cacheDb = window.openDatabase("cacheDb", "1.0", "cacheDb", 200000);

      cacheDb.transaction(function(tx) {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS `cache` (' +
          '`id` INTEGER PRIMARY KEY, ' +
          '`updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, ' +
          '`url` text NOT NULL, ' +
          '`type` text, ' +
          '`page` INTEGER(10), ' +
          '`data` text NOT NULL DEFAULT "{}");'
        );
      });
    }
    initialized = true;
  };

  var query = function(sql, values, callback) {
    if(typeof values === 'undefined') {
      values = [];
    }
    cacheDb.transaction(function(tx) {
      tx.executeSql(sql, values, function(tx, results) {
        if(typeof callback == "function") {
          callback({success: true, rowsAffected: results.rows.length, data: results});
        }
      }, function(tx, error) {
        if(typeof callback == "function") {
          callback({success:false, rowsAffected: 0, data: error});
        }
      });
    });
  };

  var public = {
    get: get
  };

  /* test-code */
  public._private = {
    getFromCache: getFromCache,
    getFromOnline: getFromOnline,
    set: set,
    initialize: initialize,
    query: query
  };
  /* end-test-code */

  return public;
}();