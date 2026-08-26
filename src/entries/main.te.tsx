// Telugu entry — served at `/te/`.
//
// Anton and Inter contain NO Telugu glyphs, so this page uses Noto Sans Telugu
// instead. Chosen by measurement, not reputation: the Telugu woff2 is 34.9 KB
// at weight 400 against 136.8 KB for Anek Telugu Variable and ~133 KB for
// Ramabhadra/Mandali. Weight 800 carries the display contrast that Anton's
// condensed shapes carry in English.
//
// The latin subsets are here for the digits in the phone number and "100%".
import '@fontsource/noto-sans-telugu/telugu-400.css'
import '@fontsource/noto-sans-telugu/telugu-800.css'
import '@fontsource/noto-sans-telugu/latin-400.css'
import '@fontsource/noto-sans-telugu/latin-700.css'

import '../styles/global.css'

import { mount } from './mount'

mount('te')
