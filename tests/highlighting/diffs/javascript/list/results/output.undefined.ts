// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`diffs suite javascript language list test undefined theme 1`] = `
Object {
  "lines": Array [
    "  1 │  1 │ function·f1(argument_one,·argument_two)·{                            ",
    "  2 │    │ ··for·(let·i·=·0;·i·<·argument_one;·i++)·{                           ",
    "    │  2 │ ··for·(let·j·=·0;·j·<·argument_one;·j++)·{                           ",
    "  3 │  3 │ ····switch·(argument_two)·{                                          ",
    "  4 │  4 │ ······case·1:                                                        ",
    "  5 │  5 │ ········return·null;                                                 ",
    "    │  6 │ ······case·2:                                                        ",
    "    │  7 │ ········return·null;                                                 ",
    "  6 │  8 │ ······case·3:                                                        ",
    "  7 │  9 │ ········return·null;                                                 ",
    "    ╽    ╽                                                                      ",
    "    ╿    ╿                                                                      ",
    " 12 │ 14 │ ······case·6:                                                        ",
    " 13 │ 15 │ ········return·null;                                                 ",
    " 14 │    │ ······case·7:                                                        ",
    " 15 │    │ ········return·null;                                                 ",
    " 16 │ 16 │ ······case·8:                                                        ",
    " 17 │ 17 │ ········return·null;                                                 ",
    "    ╽    ╽                                                                      ",
  ],
  "tokens": Array [
    "
 0 │  0, 8 │ ─────── │ function
 0 │  9,25 │ ─────── │ f1(argument_one,
 0 │ 26,39 │ ─────── │ argument_two)
 0 │ 40,41 │ ─────── │ {
───┼───────┼─────────┼──────────────────────────────────────────────────
 1 │  2, 5 │ ─────── │ for
 1 │  6,10 │ ─────── │ (let
 1 │ 11,12 │ ─────── │ i
 1 │ 13,14 │ ─────── │ =
 1 │ 15,17 │ ─────── │ 0;
 1 │ 18,19 │ ─────── │ i
 1 │ 20,21 │ ─────── │ <
 1 │ 22,35 │ ─────── │ argument_one;
 1 │ 36,40 │ ─────── │ i++)
 1 │ 41,42 │ ─────── │ {
───┼───────┼─────────┼──────────────────────────────────────────────────
 2 │  4,10 │ ─────── │ switch
 2 │ 11,25 │ ─────── │ (argument_two)
 2 │ 26,27 │ ─────── │ {
───┼───────┼─────────┼──────────────────────────────────────────────────
 3 │  6,10 │ ─────── │ case
 3 │ 11,13 │ ─────── │ 1:
───┼───────┼─────────┼──────────────────────────────────────────────────
 4 │  8,14 │ ─────── │ return
 4 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
 5 │  6,10 │ ─────── │ case
 5 │ 11,13 │ ─────── │ 3:
───┼───────┼─────────┼──────────────────────────────────────────────────
 6 │  8,14 │ ─────── │ return
 6 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
 7 │  6,10 │ ─────── │ case
 7 │ 11,13 │ ─────── │ 4:
───┼───────┼─────────┼──────────────────────────────────────────────────
 8 │  8,14 │ ─────── │ return
 8 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
 9 │  6,10 │ ─────── │ case
 9 │ 11,13 │ ─────── │ 5:
───┼───────┼─────────┼──────────────────────────────────────────────────
10 │  8,14 │ ─────── │ return
10 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
11 │  6,10 │ ─────── │ case
11 │ 11,13 │ ─────── │ 6:
───┼───────┼─────────┼──────────────────────────────────────────────────
12 │  8,14 │ ─────── │ return
12 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
13 │  6,10 │ ─────── │ case
13 │ 11,13 │ ─────── │ 7:
───┼───────┼─────────┼──────────────────────────────────────────────────
14 │  8,14 │ ─────── │ return
14 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
15 │  6,10 │ ─────── │ case
15 │ 11,13 │ ─────── │ 8:
───┼───────┼─────────┼──────────────────────────────────────────────────
16 │  8,14 │ ─────── │ return
16 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
17 │  6,10 │ ─────── │ case
17 │ 11,13 │ ─────── │ 9:
───┼───────┼─────────┼──────────────────────────────────────────────────
18 │  8,14 │ ─────── │ return
18 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
19 │  6,14 │ ─────── │ default:
───┼───────┼─────────┼──────────────────────────────────────────────────
20 │  8,14 │ ─────── │ return
20 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
21 │  4, 5 │ ─────── │ }
───┼───────┼─────────┼──────────────────────────────────────────────────
22 │  2, 3 │ ─────── │ }
───┼───────┼─────────┼──────────────────────────────────────────────────
23 │  0, 1 │ ─────── │ }
───┼───────┼─────────┼──────────────────────────────────────────────────
24 │ none  │         │
",
    "
 0 │  0, 8 │ ─────── │ function
 0 │  9,25 │ ─────── │ f1(argument_one,
 0 │ 26,39 │ ─────── │ argument_two)
 0 │ 40,41 │ ─────── │ {
───┼───────┼─────────┼──────────────────────────────────────────────────
 1 │  2, 5 │ ─────── │ for
 1 │  6,10 │ ─────── │ (let
 1 │ 11,12 │ ─────── │ j
 1 │ 13,14 │ ─────── │ =
 1 │ 15,17 │ ─────── │ 0;
 1 │ 18,19 │ ─────── │ j
 1 │ 20,21 │ ─────── │ <
 1 │ 22,35 │ ─────── │ argument_one;
 1 │ 36,40 │ ─────── │ j++)
 1 │ 41,42 │ ─────── │ {
───┼───────┼─────────┼──────────────────────────────────────────────────
 2 │  4,10 │ ─────── │ switch
 2 │ 11,25 │ ─────── │ (argument_two)
 2 │ 26,27 │ ─────── │ {
───┼───────┼─────────┼──────────────────────────────────────────────────
 3 │  6,10 │ ─────── │ case
 3 │ 11,13 │ ─────── │ 1:
───┼───────┼─────────┼──────────────────────────────────────────────────
 4 │  8,14 │ ─────── │ return
 4 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
 5 │  6,10 │ ─────── │ case
 5 │ 11,13 │ ─────── │ 2:
───┼───────┼─────────┼──────────────────────────────────────────────────
 6 │  8,14 │ ─────── │ return
 6 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
 7 │  6,10 │ ─────── │ case
 7 │ 11,13 │ ─────── │ 3:
───┼───────┼─────────┼──────────────────────────────────────────────────
 8 │  8,14 │ ─────── │ return
 8 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
 9 │  6,10 │ ─────── │ case
 9 │ 11,13 │ ─────── │ 4:
───┼───────┼─────────┼──────────────────────────────────────────────────
10 │  8,14 │ ─────── │ return
10 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
11 │  6,10 │ ─────── │ case
11 │ 11,13 │ ─────── │ 5:
───┼───────┼─────────┼──────────────────────────────────────────────────
12 │  8,14 │ ─────── │ return
12 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
13 │  6,10 │ ─────── │ case
13 │ 11,13 │ ─────── │ 6:
───┼───────┼─────────┼──────────────────────────────────────────────────
14 │  8,14 │ ─────── │ return
14 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
15 │  6,10 │ ─────── │ case
15 │ 11,13 │ ─────── │ 8:
───┼───────┼─────────┼──────────────────────────────────────────────────
16 │  8,14 │ ─────── │ return
16 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
17 │  6,10 │ ─────── │ case
17 │ 11,13 │ ─────── │ 9:
───┼───────┼─────────┼──────────────────────────────────────────────────
18 │  8,14 │ ─────── │ return
18 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
19 │  6,14 │ ─────── │ default:
───┼───────┼─────────┼──────────────────────────────────────────────────
20 │  8,14 │ ─────── │ return
20 │ 15,20 │ ─────── │ null;
───┼───────┼─────────┼──────────────────────────────────────────────────
21 │  4, 5 │ ─────── │ }
───┼───────┼─────────┼──────────────────────────────────────────────────
22 │  2, 3 │ ─────── │ }
───┼───────┼─────────┼──────────────────────────────────────────────────
23 │  0, 1 │ ─────── │ }
───┼───────┼─────────┼──────────────────────────────────────────────────
24 │ none  │         │
",
  ],
}
`;
