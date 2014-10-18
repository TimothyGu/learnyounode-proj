/*
 * Solution to "Juggling Async" exercise
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
 * The tricky thing about Node.js is that when you pass the callback into the
 * get() method, it is not guaranteed that the callback is called immediately.
 * Because Node.js is asynchronus, the callback is called whenever Node.js is
 * ready, and network latencies does not block the execution of the next
 * callback. As a result, if the printing code is embedded inside every
 * callback, the second URL might be fetched faster than the first one, and
 * got displayed first.
 *
 * As a result, you must check if all HTTP gets are done before printing all
 * the responses.
 *
 * Also, check out jug-async-recurse.js if you haven't, which uses an
 * alternative solution to this problem, that is shorter but might be slower.
 */

// Required modules
var http = require('http')
var bl   = require('bl')

// Number of URLs that will be read from the command line. The question asked
// for three.
var n_urls = 3

// Array of Strings that will be the output of the HTTP requests. This will be
// the temporary cache for the output HTTP strings.
var out  = []

// Number of HTTP requests that have been responded.
var done = 0

// What this does:
// Request the URL (`process.argv[2+i]`), and register a callback that:
//    Sets encoding to UTF-8, which ensures that the data received in pipe()
//    is a String.
//    Use bl to concat all the data received at different time together.
//    Put the received data into out[i].
//    If all the URLs have been processed by checking `done` against `n_urls`,
//    print all the output.
// At the time of execution of the callback, other callbacks might be
// simultaneously executing. That is the importance of the `done` variable.
function get(i) {
    http.get(process.argv[2 + i], function callback (response) {
        response.setEncoding('utf8')
        response.pipe(bl(function (err,data) {
            if (err) console.error(err)
            out[i] = data.toString()
            done++
            if (done === n_urls) {
                for (var j = 0; j < n_urls; j++)
                    console.log(out[j])
            }
        }))
        response.on('error', console.error)
    })
}

for (var i = 0; i < n_urls; i++)
    get(i)
