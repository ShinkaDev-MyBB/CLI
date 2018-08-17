# Usage

Try `shinka <command> --help` for detailed options and examples.

## `link`

Create symbolic links for plugin files and directories.

### Options

**-v, --verbose**: Output verbose error messages

### Examples

```shell
$ link
$ link --verbose
$ link -v
```

## `relink`

Destroy and recreate symbolic links for plugin files and directories.

### Options

**-v, --verbose**: Output verbose error messages

### Examples

```shell
$ relink
$ relink --verbose
$ relink -v
```

## `unlink`

Destroy and recreate symbolic links for plugin files and directories.

### Options

**-v, --verbose**: Output verbose error messages

### Examples

```shell
$ unlink
$ unlink --verbose
$ unlink -v
```

## `release`

Create symbolic links for plugin files and directories.

### Options

**-v, --verbose**: Output verbose error messages

**-s, --semver [version]**: Plugin version. Defaults to shinka.json.

**-N, --vendor [vendor]**: Vendor name, e.g. `shinka` in `shinka-cli`. Defaults to shinka.json.

**-c, --code [code]**: Plugin codename, e.g. `cli` in `shinka-cli`. Defaults to shinka.json.

**-o, --output [path]**: Bundle filename. Should include file extension.

**-d, --directory [path]**: Output directory and filename. Should include file extension.

### Examples

```shell
$ release      # Outputs to shinka-cli-0.0.1a.zip
$ release -N shin -c news -s 1.0.0     # Outputs to shin-news-1.0.0.zip
$ release -o to/a/path/release.zip     # Outputs to to/a/path/release.zip
$ release -d to/a/path     # Outputs to to/a/path/shinka-cli-0.0.1a.zip
```
