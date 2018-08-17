# Configure

Create the utility's config file in the root of your app. See [shinka.example.json](/blob/master/shinka.example.json) for a full example.

## `shinka.json`

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

## Fields

**link**: files and directories used by the `link`, `unlink`, and `relink` commands.

**mybb_root**: Root directory of your local MyBB installation. Used by the `link`, `unlink`, and `relink` commands.

**vendor**: Vendor name, e.g. `shinka` in `shinka-cli`. Used by the `release` command.

**code**: Plugin codename, e.g. `cli` in `shinka-cli`. Used by the `release` command.

**version**: Semantic plugin version. Used by the `release` command.
