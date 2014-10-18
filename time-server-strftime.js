/*
 * Solution to "Time server" exercise -- strftime version
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
 * This solution DOES use strftime package which hides away the ugliness of
 * zero-filling and formatting, as suggested by learnyounode.
 *
 * Read time-server.js FIRST, if you'd like to actually learn the individual
 * steps.
 */

// We need to use low-level net module here
var net      = require('net')
var strftime = require('strftime')

// Create a TCP server
var server = net.createServer(function (socket) {
    // Use strftime to generate the output 
    socket.end(strftime('%Y-%m-%d %H:%M'))
})

// We need to convert the third argument to a number before passing to listen()
server.listen(Number(process.argv[2]))
