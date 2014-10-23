/*
 * Solution to "JSON Server" exercise
 * Copyright (c) 2014, Tiancheng "Timothy" Gu
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

/*
 * This exercise is quite straight-forward. Some more hints that will make
 * your life easier:
 *
 * 1. You can use the require('url').parse() method to produce a URL object
 *    containing many useful properties of the parsed URL.
 *    a. Of special importance for this exercise is urlObj.query, that is
 *       itself an object containing queries. You can use urlObj.query.iso
 *       to fetch the `?iso=` part of the URL.
 *    b. urlObj.pathname can be used in a switch{case:} to distinguish the
 *       requested file name.
 * 2. The UNIX timestamp can be fetched with `Date.getTime()`.
 *    a. The **current** UNIX timestamp is `Date.now`. We won't use this in
 *       this exercise however.
 */

// We'll be using http and url modules of Node.js.
var http = require('http')
var url  = require('url')

// Create server with a callback.
var server = http.createServer(function (req, res) {
    // Parse requested URL.
    var urlObj = url.parse(req.url, true)
    // This is the `?iso=` value of the request URL.
    var reqTime = urlObj.query.iso
    // This is the Date object for the requested time, that we can use to
    // format the output.
    var time = new Date(reqTime)

    switch(urlObj.pathname) {
    // If `/api/parsetime?iso=...` is the requested URL...
    case '/api/parsetime':
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({
            'hour':   time.getHours(),
            'minute': time.getMinutes(),
            'second': time.getSeconds()
        }))
        res.end()
        break

    // If `/api/unixtime?iso=...` is the requested URL...
    case '/api/unixtime':
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ unixtime: time.getTime() }))
        res.end()
        break

    // Else, error out.
    default:
        res.writeHead(404, 'Not found', { 'Content-Type': 'text/plain' })
        res.write('404 Not found.')
        res.end()
    }
})

// Start listening on port specified by 1st argument
server.listen(Number(process.argv[2]))
