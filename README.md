# Setup K6 Performance Testing

This action downloads and installs [K6](https://k6.io/) via the [Actions tool-cache utility](https://github.com/actions/toolkit/tree/main/packages/tool-cache).  This action requires the use of nodejs.  Please ensure
it is installed on the action runner prior to this action.

## Index

- [Inputs](#inputs)
- [Outputs](#outputs)
- [Example](#example)
- [Contributing](#contributing)
  - [Recompiling](#recompiling)
  - [Incrementing the Version](#incrementing-the-version)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

---
### Pre-requisites

- Install `pre-commit`
- Run `pre-commit install` to setup the run `yaml format` on every commit
- This action requires that the `actions/checkout` action has run and a `fetch-depth: 0` has been set.  The action cannot examine the tags and branches of the repository unless they've been pulled down.

## Inputs
| Parameter      | Is Required | Description                                                                                                                                    |
| -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `version`      | true        | The version of k6 to install.  Do not include the `v` in the prefix.  At this time only versions 0.32.0 and higher will work with this action. |
| `architecture` | false       | Target operating system architecture for K6 to use. Examples: amd64, arm64. Will use system architecture by default.                           |

## Outputs

No Outputs

## Example

```yml
jobs:
  stress-test:
    runs-on: ubuntu-20.04

    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Setup K6
        uses: im-open/setup-k6-perf-testing@v1.0.3
        with:
          version: 0.33.0 # Must be >= 0.32.0

      - name: K6 Stress Test
        shell: bash
        run: |
          # Set open file limit to maximum. Has to be set in this step to take affect.
          ulimit -n 1048576
          # Run your test.
          k6 run check-health-simple.js
```

## Contributing

When creating new PRs please ensure:
1. For major or minor changes, at least one of the commit messages contains the appropriate `+semver:` keywords listed under [Incrementing the Version](#incrementing-the-version).
2. The `README.md` example has been updated with the new version.  See [Incrementing the Version](#incrementing-the-version).
3. The action code does not contain sensitive information.

### Incrementing the Version

This action uses [git-version-lite] to examine commit messages to determine whether to perform a major, minor or patch increment on merge.  The following table provides the fragment that should be included in a commit message to active different increment strategies.
| Increment Type | Commit Message Fragment                     |
| -------------- | ------------------------------------------- |
| major          | +semver:breaking                            |
| major          | +semver:major                               |
| minor          | +semver:feature                             |
| minor          | +semver:minor                               |
| patch          | *default increment type, no comment needed* |

## Code of Conduct

This project has adopted the [im-open's Code of Conduct](https://github.com/im-open/.github/blob/main/CODE_OF_CONDUCT.md).

## License

Copyright &copy; 2022, Extend Health, LLC. Code released under the [MIT license](LICENSE).

[git-version-lite]: https://github.com/im-open/git-version-lite
