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

Create the utility's config file in the root of your app. See [shinka.example.json](/blob/master/shinka.example.json) for a full example.

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

Try `shinka <command> --help` for detailed options and examples.

### `shinka link`

Creates symbolic links for files designated in shinka.json

| Flag            | Description                   |
| :-------------- | :---------------------------- |
| `-v, --verbose` | Output verbose error messages |

```shell
$ shinka link
$ shinka link --verbose
$ shinka link -v
```

### `shinka unlink`

Destroys symbolic links for files designated in shinka.json

| Flag            | Description                   |
| :-------------- | :---------------------------- |
| `-v, --verbose` | Output verbose error messages |

```shell
$ shinka unlink
$ shinka unlink --verbose
$ shinka unlink -v
```

### `shinka relink`

Destroys and recreates symbolic links for files designated in shinka.json

| Flag            | Description                   |
| :-------------- | :---------------------------- |
| `-v, --verbose` | Output verbose error messages |

```shell
$ shinka relink
$ shinka relink --verbose
$ shinka relink -v
```

### `shinka release`

Builds and bundles for release.

Output filename in format `<vendor>-<code>-<version>.zip`, e.g. `shinka-cli-0.0.1a.zip`

Uses `git archive HEAD:src --format zip` to bundle. Configure your `.gitattributes` accordingly.

| Flag                               | Description                                                   |     |
| :--------------------------------- | :------------------------------------------------------------ | :-- |
| `-s <version>, --semver <version>` | Version to release                                            |
| `-N <vendor>, --vendor <vendor>`   | Vendor name, e.g. `shinka` in `shinka-cli`                    |
| `-c <code>, --code <code>`         | Plugin code, e.g. `cli` in `shinka-cli`                       |
| `-o <path>, --output <path>`       | Output filename. Should include file extension.               |
| `-d <dir>, --directory <dir>`      | Output directory and filename. Should include file extension. |

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
