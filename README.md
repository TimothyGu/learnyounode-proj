learnyounode solutions
======================

These are solutions to the learnyounode workshopper. They are written by
[@TimothyGu](https://github.org/TimothyGu) on his endeavour to Node.js
mastery. It is meant to help Node.js beginners for the PIxEL Clubs (and
himself). Not guaranteed to be safe for production (i.e. multi-core servers,
VPS, etc.) use!

Contributing
------------

ALL contributions that make the code easier to read or more robust against are
welcome, as long as it doesn't make the code harder to read for a Node.js
beginner (like me).

You can submit pull request on the right of this page.

Troubleshooting
---------------

If you encounter errors like this:

    Error: Cannot find module 'foobar'
        at Function.Module._resolveFilename (module.js:338:15)
        at Function.Module._load (module.js:280:25)
        at Module.require (module.js:364:17)
        at require (module.js:380:17)
        at Object.<anonymous> (/path/to/solution.js:29:16)
        at Module._compile (module.js:456:26)
        at Object.Module._extensions..js (module.js:474:10)
        at Module.load (module.js:356:32)
        at Function.Module._load (module.js:312:12)
        at Function.Module.runMain (module.js:497:10)

Try installing the specified module by doing:

    npm install foobar

in the solution directory.

License & Disclaimer
--------------------

This project is licensed under the ISC license, reproduced in every source file
and below:

Copyright (c) 2014, Tiancheng "Timothy" Gu

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
