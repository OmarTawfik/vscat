// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`sources suite python language test-file test undefined theme 1`] = `
Object {
  "lines": Array [
    "  1 │ def·test_sum():                                                           ",
    "  2 │ ····assert·sum([1,·2,·3])·==·6,·\\"Should·be·6\\"                             ",
    "  3 │                                                                           ",
    "  4 │ def·test_sum_tuple():                                                     ",
    "  5 │ ····assert·sum((1,·2,·2))·==·6,·\\"Should·be·6\\"                             ",
    "  6 │                                                                           ",
    "  7 │ if·__name__·==·\\"__main__\\":                                                ",
    "  8 │ ····test_sum()                                                            ",
    "  9 │ ····test_sum_tuple()                                                      ",
    " 10 │ ····print(\\"Everything·passed\\")                                            ",
    " 11 │                                                                           ",
  ],
  "tokens": Array [
    "
 0 │  0, 3 │ ─────── │ def
 0 │  4,15 │ ─────── │ test_sum():
───┼───────┼─────────┼──────────────────────────────────────────────────
 1 │  4,10 │ ─────── │ assert
 1 │ 11,18 │ ─────── │ sum([1,
 1 │ 19,21 │ ─────── │ 2,
 1 │ 22,25 │ ─────── │ 3])
 1 │ 26,28 │ ─────── │ ==
 1 │ 29,31 │ ─────── │ 6,
 1 │ 32,39 │ ─────── │ \\"Should
 1 │ 40,42 │ ─────── │ be
 1 │ 43,45 │ ─────── │ 6\\"
───┼───────┼─────────┼──────────────────────────────────────────────────
 2 │ none  │         │
───┼───────┼─────────┼──────────────────────────────────────────────────
 3 │  0, 3 │ ─────── │ def
 3 │  4,21 │ ─────── │ test_sum_tuple():
───┼───────┼─────────┼──────────────────────────────────────────────────
 4 │  4,10 │ ─────── │ assert
 4 │ 11,18 │ ─────── │ sum((1,
 4 │ 19,21 │ ─────── │ 2,
 4 │ 22,25 │ ─────── │ 2))
 4 │ 26,28 │ ─────── │ ==
 4 │ 29,31 │ ─────── │ 6,
 4 │ 32,39 │ ─────── │ \\"Should
 4 │ 40,42 │ ─────── │ be
 4 │ 43,45 │ ─────── │ 6\\"
───┼───────┼─────────┼──────────────────────────────────────────────────
 5 │ none  │         │
───┼───────┼─────────┼──────────────────────────────────────────────────
 6 │  0, 2 │ ─────── │ if
 6 │  3,11 │ ─────── │ __name__
 6 │ 12,14 │ ─────── │ ==
 6 │ 15,25 │ ─────── │ \\"__main__\\"
 6 │ 25,26 │ ─────── │ :
───┼───────┼─────────┼──────────────────────────────────────────────────
 7 │  4,14 │ ─────── │ test_sum()
───┼───────┼─────────┼──────────────────────────────────────────────────
 8 │  4,20 │ ─────── │ test_sum_tuple()
───┼───────┼─────────┼──────────────────────────────────────────────────
 9 │  4,10 │ ─────── │ print(
 9 │ 10,21 │ ─────── │ \\"Everything
 9 │ 22,29 │ ─────── │ passed\\"
 9 │ 29,30 │ ─────── │ )
───┼───────┼─────────┼──────────────────────────────────────────────────
10 │ none  │         │
",
  ],
}
`;