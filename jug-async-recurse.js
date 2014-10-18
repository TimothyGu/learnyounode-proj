/*
 * Solution to "Juggling Async" exercise -- recursive version
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
 * This solution is an alternative to jug-async.js. Rather than using a done
 * variable to keep track of the responses, this forces blocking by calling
 * the function again with a new url after it is done.
 *
 * This is much slower than jug-async.js, as every request is serialized (as
 * much as 50% slower). But IMO it is easier to write, and is shorter.
 */

// Required modules
var http = require('http')
var bl   = require('bl')

// Number of URLs that will be read from the command line. The question asked
// for three.
var n_urls = 3

// What this does:
// Request the URL (`process.argv[2+i]`), and register a callback that:
//    Sets encoding to UTF-8, which ensures that the data received in pipe()
//    is a String.
//    Use bl to concat all the data received at different time together.
//    Print the data received.
//    Request the next URL (`process.argv[2+i+1]`) by calling itself again
//    with a different i value.
function get(i) {
    http.get(process.argv[2 + i], function callback (response) {
        response.setEncoding('utf8')
        response.pipe(bl(function (err,data) {
            if (err) console.error(err)
            console.log(data.toString())
            // Check if we are done. i starts at 0, so we need to -1 from
            // u_urls
            if (i !== n_urls - 1)
                get(i + 1)
        }))
        response.on('error', console.error)
    })
}

get(0)
