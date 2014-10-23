/*
 * Solution to "HTTP Uppercaserer" exercise -- ol'-style version
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
 * Rather than using all those fancy-shmancy pipes, maps, blah blah, we can
 * use the old-style req.on('data'). Be extra careful though, because you
 * have to write a callback on req.on('end') that ends res. Because if you
 * don't, the program's gonna stall for ever and ever, until either node
 * crashes or something in the system crashes that crashes node with it.
 */

// We'll be using http and through2-map.
var http = require('http')

// Create server with callback that...
var server = http.createServer(function (req/*uest*/, res/*ponse*/) {
    // ... if POST is requested ...
    if (req.method === 'POST') {
        // When data arrives, write transformed chunk to res.
        req.on('data', function(chunk) {
            res.write(chunk.toString().toUpperCase())
        })

        // When request ends, end response as well.
        req.on('end', function() {
            res.end()
        })
    } else {
        req.end('Only POST method is supported.')
    }
})

// Start listening on port specified by 1st argument
server.listen(Number(process.argv[2]))
