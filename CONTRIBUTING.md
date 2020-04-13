# Contributing

Contributions are a vital part of this library and imgix's commitment to open-source. We welcome all contributions which align with this project's goals. All we ask is that you please take a moment to review this document in order to make the contribution process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of
the developers managing and developing this open source project. In return,
they should reciprocate that respect in addressing your issue or assessing
patches and features.

## Project Goals

- Provide a simple, easy-to-understand API that users can use to get started in **the shortest time possible**. This API should cover a large amount (~80%) of use cases of a normal img element without making the API surface too large or complicated.
- Provide a separate, powerful, low-level API that gets out of the way to allow developers to use the imgix API in Vue how they like.
- The code should be well-tested and of high quality.
- The public API should be handled with care because a) once an API is submitted, we are committed to supporting it for a reasonable amount of time, and b) any changes to the API creates exponentially more work for the users of our libraries.

## Using the issue tracker

The issue tracker is the preferred channel for [bug reports](#bugs),
[features requests](#features), questions, and [submitting pull
requests](#pull-requests), but please respect the following restrictions:

- Please **do not** derail or troll issues. Keep the discussion on topic and
  respect the opinions of others.

## Development

The development of this library follows [this very useful guide about Outside-In Frontend Development in Vue](https://outsidein.dev/exercise-intro.html). I highly recommend at least becoming familiar with some of the core concepts of Outside-In TDD.

## Code Conventions

1.  Make all changes to files under `./src`, **not** `./dist` or `./es`.
2.  Use [Prettier](https://prettier.io/) for code formatting. Code will automatically be formatted upon submitting a PR.

### Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Run your end-to-end tests

```
yarn test:e2e
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
