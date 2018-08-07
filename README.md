# shinka-cli

Command line tool for developing MyBB plugins.

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

Create the utility's config file in the root of your app.

#### `shinka.json`

```json
{
    "link": {
        "files": ["inc/plugins/shinka.php"],
        "directories": ["inc/plugins/Shinka"]
    },
    "mybb_root": "C:/path/to/mybb/root"
}
```

## Usage

### `shinka link`

Creates symbolic links for files designated in shinka.json

| Flag            | Description                |
| :-------------- | :------------------------- |
| `-v, --verbose` | Output full error messages |

```shell
$ shinka link
$ shinka link --verbose
$ shinka link -v
```

### `shinka unlink`

Destroys symbolic links for files designated in shinka.json

| Flag            | Description                |
| :-------------- | :------------------------- |
| `-v, --verbose` | Output full error messages |

```shell
$ shinka unlink
$ shinka unlink --verbose
$ shinka unlink -v
```

### `shinka relink`

Destroys and recreates symbolic links for files designated in shinka.json

| Flag            | Description                |
| :-------------- | :------------------------- |
| `-v, --verbose` | Output full error messages |

```shell
$ shinka relink
$ shinka relink --verbose
$ shinka relink -v
```

### `shinka test`

Runs PHPUnit tests and outputs results.

| Flag                       | Description          |
| :------------------------- | :------------------- |
| `-o <path>, --only <path>` | Only run these tests |

```shell
$ shinka test
$ shinka test -o path/to/specific/test(s)
```

### `shinka release`

Builds and bundles for release.

Output filename in format `<vendor>-<code>-<version>.zip`, e.g. `shinka-cli-0.0.1a.zip`

| Flag                                   | Description                                |                                                                 |
| :------------------------------------- | :----------------------------------------- | :-------------------------------------------------------------- |
| `-v <version>, --version <version>`    | Version to release                         |
| `-V <vendor>, --vendor <vendor>`       | Vendor name, e.g. `shinka` in `shinka-cli` |
| `-c <code>, --code <code>`             | Plugin code, e.g. `cli` in `shinka-cli`    |
| `-b <version>, --bump <version>`       | Bumps version before release               | `patch`, `minor`, `major`, or a specific version, e.g. `1.0.2a` |
| `-f <filename>, --filename <filename>` | Should include file extension              |

```json
// shinka.json
{
    "code": "cli",
    "vendor": "shinka",
    "version": "1.0.0"
}
```

```shell
$ shinka release                            # => shinka-cli-1.0.0.zip
$ shinka release -v 1.0.0a                  # => shinka-cli-1.0.0a.zip
$ shinka release -V shin -C news            # => shin-news-1.0.0.zip
$ shinka release -b minor                   # => shinka-news-1.1.0.zip
```
