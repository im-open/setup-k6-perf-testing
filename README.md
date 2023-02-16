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

| Parameter                 | Is Required | Description                                                                                                                                    |
| ------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `version`                 | true        | The version of k6 to install.  Do not include the `v` in the prefix.  At this time only versions 0.32.0 and higher will work with this action. |
| `architecture`            | false       | Target operating system architecture for K6 to use. Examples: amd64, arm64. Will use system architecture by default.                           |
| `extension-token`         | false       | Github PAT token that has access to releases of k6 extension repository.                                                                       |
| `extension-asset-name`    | false       | K6 extension archive File name to download in the release                                                                   |
| `extension-tag-name`      | false       | Release tag to download k6 extension archive.                                          |
| `extension-repository`    | false       | Repository that contains the k6 extension archive.                                          |

## Outputs

No Outputs

## Example

```yml
jobs:
  stress-test:
    runs-on: ubuntu-20.04

    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Setup K6
        uses: im-open/setup-k6-perf-testing@v1
        with:
          version: 0.38.3 # Must be >= 0.32.0

      - name: K6 Stress Test
        shell: bash
        run: |
          # Set open file limit to maximum. Has to be set in this step to take affect.
          ulimit -n 1048576
          # Run your test.
          k6 run check-health-simple.js
```

***Using custom k6 binary with extensions***

```yml
jobs:
  stress-test:
    runs-on: ubuntu-20.04

    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Setup K6
        uses: im-open/setup-k6-perf-testing@latest
        with:
          version: 0.38.3 # Must be >= 0.32.0
          extension-token: ${{ secrets.your-token }}
          extension-asset-name: 'k6_'
          extension-tag-name: 'k6-v0.1.0'
          extension-repository: '<org/username>/k6-extension-repo'

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
1. The action code does not contain sensitive information.

When a pull request is created and there are changes to code-specific files and folders, the `auto-update-readme` workflow will run.  The workflow will update the action-examples in the README.md if they have not been updated manually by the PR author. The following files and folders contain action code and will trigger the automatic updates:

- `action.yml`
- `package.json`
- `package-lock.json`
- `src/**`
- `dist/**`

There may be some instances where the bot does not have permission to push changes back to the branch though so this step should be done manually for those branches. See [Incrementing the Version](#incrementing-the-version) for more details.

### Incrementing the Version

The `auto-update-readme` and PR merge workflows will use the strategies below to determine what the next version will be.  If the `auto-update-readme` workflow was not able to automatically update the README.md action-examples with the next version, the README.md should be updated manually as part of the PR using that calculated version.

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
