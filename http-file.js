#!/usr/bin/env node
/*
 * Solution to "HTTP File Server" exercise
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
 * This exercise is quite straight-forward. The hints give you pretty 
 * much all the information you need.
 */

// We'll be using http and fs.
var http = require('http')
var fs   = require('fs')

// Create file read stream from 2nd argument.
var file = fs.createReadStream(process.argv[3])

// Create server with callback that...
var server = http.createServer(function (req, res) {
    // ... pipes the file to the response.
    file.pipe(res)
})

// Start listening on port specified by 1st argument
server.listen(Number(process.argv[2]))
