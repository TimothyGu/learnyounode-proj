var http = require('http')
var bl   = require('bl')

var n_urls = 3 // The question asks for three.
var out  = []
var done = 0

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
