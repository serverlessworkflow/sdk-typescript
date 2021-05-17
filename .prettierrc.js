module.exports = {
  printWidth: 120,                        /** Specify the line length that the printer will wrap on. */
  // tabWidth: 2,                         /** Specify the number of spaces per indentation-level. */
  // useTabs: false,                      /** Indent lines with tabs instead of spaces. */
  // semi: true,                          /** Print semicolons at the ends of statements. */
  singleQuote: true,                      /** Use single quotes instead of double quotes. */
  // quoteProps: 'as-needed',             /** Change when properties in objects are quoted. */
  // jsxSingleQuote: false,               /** Use single quotes instead of double quotes in JSX. */
  // trailingComma: 'es5',                /** Print trailing commas wherever possible in multi-line comma-separated syntactic structures. (A single-line array, for example, never gets trailing commas.) */
  // bracketSpacing: true,                /** Print spaces between brackets in object literals. */
  // jsxBracketSameLine: false,           /** Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements). */
  // arrowParens: 'always',               /** Include parentheses around a sole arrow function parameter. */
  // rangeStart: 0,                       /** Format only a segment of a file. */
  // rangeEnd: Infinity,                  /** Format only a segment of a file. */
  // parser: None,                        /** Prettier automatically infers the parser from the input file path, so you shouldn’t have to change this setting. */
  // filepath: None,                      /** Specify the file name to use to infer which parser to use. */
  // requirePragma: false,                /** Prettier can restrict itself to only format files that contain a special comment, called a pragma, at the top of the file. This is very useful when gradually transitioning large, unformatted codebases to Prettier. */
  // insertPragma: false,                 /** Prettier can insert a special @format marker at the top of files specifying that the file has been formatted with Prettier. This works well when used in tandem with the --require-pragma option. If there is already a docblock at the top of the file then this option will add a newline to it with the @format marker. */
  // proseWrap: 'preserve',               /** By default, Prettier will wrap markdown text as-is since some services use a linebreak-sensitive renderer, e.g. GitHub comment and BitBucket. In some cases you may want to rely on editor/viewer soft wrapping instead, so this option allows you to opt out with "never". */
  // htmlWhitespaceSensitivity: 'css',    /** Specify the global whitespace sensitivity for HTML, Vue, Angular, and Handlebars. See whitespace-sensitive formatting for more info. */
  // vueIndentScriptAndStyle: false,      /** Whether or not to indent the code inside <script> and <style> tags in Vue files. Some people (like the creator of Vue) don’t indent to save an indentation level, but this might break code folding in your editor. */
  // endOfLine: 'lf',                     /** For historical reasons, there exist two common flavors of line endings in text files. That is \n (or LF for Line Feed) and \r\n (or CRLF for Carriage Return + Line Feed). The former is common on Linux and macOS, while the latter is prevalent on Windows. Some details explaining why it is so can be found on Wikipedia. */
  // embeddedLanguageFormatting: 'auto',  /** Control whether Prettier formats quoted code embedded in the file. */
};