// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`diagnostics suite html language tag-info test undefined theme 1`] = `
Object {
  "lines": Array [
    "  1 │ <html>                                                                    ",
    "  2 │ ··<head>                                                                  ",
    "  3 │ ····<meta·foo=\\"bar\\"·/>                                                    ",
    "    │           ~~~                                                             ",
    "  4 │ ····<meta·charset=\\"utf-8\\"·/>                                              ",
    "  5 │ ····<title>my·page</title>                                                ",
  ],
  "tokens": Array [
    "
 0 │  0, 6 │ ─────── │ <html>
───┼───────┼─────────┼──────────────────────────────────────────────────
 1 │  2, 8 │ ─────── │ <head>
───┼───────┼─────────┼──────────────────────────────────────────────────
 2 │  4, 9 │ ─────── │ <meta
 2 │ 10,14 │ ─────── │ foo=
 2 │ 14,19 │ ─────── │ \\"bar\\"
 2 │ 20,22 │ ─────── │ />
───┼───────┼─────────┼──────────────────────────────────────────────────
 3 │  4, 9 │ ─────── │ <meta
 3 │ 10,18 │ ─────── │ charset=
 3 │ 18,25 │ ─────── │ \\"utf-8\\"
 3 │ 26,28 │ ─────── │ />
───┼───────┼─────────┼──────────────────────────────────────────────────
 4 │  4,13 │ ─────── │ <title>my
 4 │ 14,26 │ ─────── │ page</title>
───┼───────┼─────────┼──────────────────────────────────────────────────
 5 │  2, 9 │ ─────── │ </head>
───┼───────┼─────────┼──────────────────────────────────────────────────
 6 │  2, 8 │ ─────── │ <body>
───┼───────┼─────────┼──────────────────────────────────────────────────
 7 │  4,11 │ ─────── │ Content
───┼───────┼─────────┼──────────────────────────────────────────────────
 8 │  2, 9 │ ─────── │ </body>
───┼───────┼─────────┼──────────────────────────────────────────────────
 9 │  0, 7 │ ─────── │ </html>
───┼───────┼─────────┼──────────────────────────────────────────────────
10 │ none  │         │
",
  ],
}
`;
