# cache-js

A javascript module to cache json data (or any data) using a Web SQL database.

## Usage

```js
cache.get(url, callback, options);
```

## Options

- `params` - `default: ""` - these are the params that are passed with the ajax call
- `page` - `default: 1` - this is an optional way to distinguish identical urls, if you want to cache multiple "pages" of data from the same url
- `type` - `default: ""` - this is an optional way to distinguish identical urls, if you want to cache multiple times from the same url
- `offline` - `default: false` - whether or not you're online (or whether or not you want to try to get the data from online)
- `fallback` - `default: true` - whether or not you want to get data from the local database if the online ajax call fails
- `save` - `default: true` - whether or not you want to cache the data to the local database
- `ajaxType`- `default: 'POST'` - type of ajax call to make (either 'GET' or 'POST')

# Example Usage

```js
cache.get(
  myUrl,
  function(results) {
    // Do whatever
  },
  {
    params: "fname=Bob&lname=Smith",
    page: 1,
    offline: false,
    fallback: true,
    save: true,
    ajaxType: 'POST'
  }
);
```

Example with json parameters:

```js
cache.get(
  myUrl,
  function(results) {
    // Do whatever
  },
  {
    params: {'fname': 'Bob', 'lname': 'Smith'}
  }
);
```

## Dependencies

It does require jquery for the ajax call, but if anyone wants to contribute in order to remove that dependency, that would be great.

## Contributing

I believe that everything is working, but feel free to put in an issue  or to fork and make a pull request.
