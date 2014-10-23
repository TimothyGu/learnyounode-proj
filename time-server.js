#!/usr/bin/env node
/*
 * Solution to "Time server" exercise -- plain version
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
 * This solution does not use strftime package.
 */

// We need to use low-level net module here
var net = require('net')

// Create a TCP server
var server = net.createServer(function (socket) {
    // Get date and time
    // 1. Create a Date object
    var date  = new Date()

    // 2. Get date and time from the Date object
    var year  = date.getFullYear()
    var month = date.getMonth()
    var day   = date.getDate()
    var hour  = date.getHours()
    var min   = date.getMinutes()

    // Use this to test if the program is completely correct:
    /*
    year   = 3
    month  = 0
    day    = 1
    hour   = 0
    min    = 59
    */

    // 3. month starts at 0, not 1
    month += 1

    // Format requested is "YYYY-MM-DD hh:mm", which means that we have to
    // zero-fill the numbers.

    /*
     * How this works:
     * 1. Adding a String of a bunch of zeros to the beginning of the
     *    already auto-converted integer String.
     * 2. Strip away unneeded zeros with a substr() that specifies the number
     *    of total digits desired
     */
    var yearStr  = ('0000' + year ).substr(-4)
    var monthStr = ('00'   + month).substr(-2)
    var dayStr   = ('00'   + day  ).substr(-2)
    var hourStr  = ('00'   + hour ).substr(-2)
    var minStr   = ('00'   + min  ).substr(-2)

    // Final formatting:
    var outStr   = yearStr + '-' + monthStr + '-' + dayStr + ' ' +
                   hourStr + ':' + minStr

    // Somehow learnyounode needs a new line character:
    outStr += '\n'

    // Write the output to the socket
    socket.write(outStr)

    // End the socket
    socket.end()

    // You can combine the last two steps:
    // socket.end(outStr)
})

// We need to convert the third argument to a number before passing to listen()
server.listen(Number(process.argv[2]))
