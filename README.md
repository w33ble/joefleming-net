# What Is This?

[![powered by](https://img.shields.io/badge/powered%20by-metalsmith-blue.svg)](http://www.metalsmith.io/)

My static site generator, hosted at [joefleming.net](http://joefleming.net)

## Usage

All metalsmith plugins live in `lib`. Each module takes the chain of processing, and is expected to wrap the `.use()` call internally. Consult any existing plugin for how this works.

A `.env` file may be used to set environment variables nearly as a simple file, or actual environment variables may be used. Consult `defaults.env` for which variables are used and what their default values are.

## Scripts

All scripts can be run with either `yarn run` or `npm run`.

script | description
------ | -----------
`dev` | Builds the static assets, starts a dev server, and watches for any changes
`build` | Builds the static assets
`prod` | Builds the static assets and starts a simple server to serve them
