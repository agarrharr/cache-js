cache-js
=====================

A javascript module to cache json data (or any data) using a Web SQL database.

Usage
=====================
cache.get(url, callback, options);

Options
=====================
params- default: ""- these are the params that are passed with the ajax call

page- default: 1- this is an optional way to distinguish identical urls, if you want to cache multiple "pages" of data from the same url

type- default: ""- this is an optional way to distinguish identical urls, if you want to cache multiple times from the same url

offline- default: false- whether or not you're online (or whether or not you want to try to get the data from online)

fallback- default: true- whether or not you want to get data from the local database if the online ajax call fails

save- default: true- whether or not you want to cache the data to the local database

Example Usage
=====================

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
        save: true
      }
    );

Dependencies
=====================
It does require jquery for the ajax call, but if anyone wants to contribute in order to remove that dependency, that would be great.


Contributing
=====================

I believe that everything is working, but feel free to put in an issue  or to fork and make a pull request.

Copyright
=====================

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.