# Comparison Widget in React

Comparison widget bundled with everything necessary for usage on pure JS context.

The comparison table that this widget imports comes from [comparison-components](https://github.com/transferwise/comparison-components) repo.

### Install

Run: `npm install` to install the dependencies (i.e. bootstrap, and others required for building).

### Developing

There is a template html file in the home directory called `index.html` which you can use for testing.

To start development run `npm start`.

Before making a PR make sure to run `npm run build` in order to create the `dist` files (they need to be in the commit).

### Adding the widget to external pages

1- Add the bootstrap and the widget css (in the dist directory) in the `<head>`.
```
<link rel="stylesheet" href="../bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="dist/css/main.css">
```
2- Add the html tag with a `tw-comparison` class as the base element for the widget like below.
```
<div class="tw-comparison"
      data-source="GBP"
      data-target="EUR"
      data-amount="<initial-amount-you-want>"
      data-providers="<[array-of-providers]>"></div>
```

Note that the `providers` attribute is optional and takes an array as a value, and is used to select the providers to be displayed in the table.

3- Add the minified main javascript file in the `<body>` tag.
```
<script src="dist/js/main.js"></script>
```

You can easily follow the `index.html` example.
