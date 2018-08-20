# shinka-cli

Command line tool for developing MyBB plugins.

## Features

-   Quickly create (and delete) symlinks from your working directory to your MyBB root
-   Bundle plugin for release

## Documentation

See [Documentation](https://shinkadev-mybb.github.io) for detailed installation, configuration, and usage information.

## Installation

### Yarn

```shell
yarn global add shinka-cli
```

### NPM

```shell
npm install --global shinka-cli
```

### Configure

Create the utility's config file in the root of your app. See [Configure](https://shinkadev-mybb.github.io/cli/manual/configure.html) for detailed instructions and example.

#### `shinka.json`

```json
{
    "link": {
        "files": ["inc/plugins/shinka.php"],
        "directories": ["inc/plugins/Shinka"]
    },
    "mybb_root": "C:/path/to/mybb/root",
    "vendor": "shinka",
    "code": "cli",
    "version": "0.0.1-a"
}
```

## Usage

See [Usage](https://shinkadev-mybb.github.io/cli/manual/usage.html) or try `shinka <command> --help` for detailed options and examples.
