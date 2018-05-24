module.exports = {
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["react", "jest", "prettier"],
  globals: {
    fetch: false,
  },
  rules: {
    // start eslint create-react-app workaround
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { aspects: ["invalidHref"] }],
    // end eslint create-react-app workaround

    "comma-dangle": 0,
    "arrow-parens": 0,
    "react/prop-types": 0,
    "react/forbid-prop-types": 0,
    "no-underscore-dangle": [2, { allow: ["__"] }],

    // A jsx extension is not required for files containing jsx
    "react/jsx-filename-extension": 0,

    // This rule struggles with flow and class properties
    "react/sort-comp": 0,

    // ignore linebreak style. the CRLF / LF endings wont matter
    // if a windows user correctly converts CRLF to LF upon commits otherwise
    // there are errors every line.
    "linebreak-style": 0,
    "max-len": ["error", { code: 100, ignoreUrls: true }],
    "prettier/prettier": [
      "error",
      { trailingComma: "es5", singleQuote: true }
    ],

    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }]
  }
};
