#!/usr/bin/env node
/*
 * Solution to "HTTP Uppercaserer" exercise -- through2-map version
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
 * From a first look this is quite hard. Additional hints:
 * - You can check the request method with req.method
 * - req is a Stream that contains the post data and that you can directly
 *   work with.
 * - For those who don't know Array#map(func), what is does that it executes
 *   `func()` to all elements of the Array.
 * - through2-map works pretty much the same way, except Stream.map(func)
 *   executes `func()` to all **chunks** of the **Stream**.
 *
 * There is a simpler way to do this, with the old-style events API of http.
 * However, be sure to look over this (slower and more complex) solution
 * jumping to http-uppercaserer-ol-style.js.
 */

// We'll be using http and through2-map.
var http = require('http')
var map  = require('through2-map')

// Create server with callback that...
var server = http.createServer(function (req, res) {
    // ... if POST is requested ...
    if (req.method === 'POST') {
        // ... does the following through a series of pipes:

        // request Stream -> chunks mapped to `transform()`
        // -> converted to String and uppercased and returned to map()
        // -> map()'s transformed data is piped to res.

        // Shell pseudocode:
        //     (
        //         chunks=`read req`     # equivalent to first pipe()
        //         for r in $chunks      # equivalent to map()
        //         do
        //             toString $r | uppercase # equivalent to transform()
        //         done
        //     ) | write res             # equivalent to second pipe()

        req.pipe(map(function transform(chunk) {
            return chunk.toString().toUpperCase()
        })).pipe(res)
    } else {
        req.end('Only POST method is supported.')
    }
})

// Start listening on port specified by 1st argument
server.listen(Number(process.argv[2]))
