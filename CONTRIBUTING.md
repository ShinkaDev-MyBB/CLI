# Contributing

## Code of Conduct

Please note that this project is released with a [Contributor Covenant Code of Conduct](CONTRIBUTING.md). By participating in this project you agree to abide by its terms.

## Standards

-   New features must have tests
-   Branching model loosely follows [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
-   All contributions should branch off of `develop` and all PRs should merge back into `develop`
-   Prefix branch names with `bugfix/` or `feature/` as appropriate, e.g. `feature/test-command`

## Setup

```shell
git clone https://github.com/ShinkaDev-MyBB/cli.git
cd cli
yarn install # or npm install

# Run project
node dist/bin/shinka.js --help
```

```shell
# Run tests
yarn test
yarn test --watch

# Generate docs/
yarn docs

# Build for release
yarn build
```
