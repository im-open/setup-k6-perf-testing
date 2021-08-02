# composite-run-steps-action-template

This action downloads and installs [K6](https://k6.io/) via the [Actions tool-cache utility](https://github.com/actions/toolkit/tree/main/packages/tool-cache).  This action requires the use of nodejs.  Please ensure
it is installed on the action runner prior to this action.

## Inputs
| Parameter      | Is Required | Description                  |
| -------------- | ----------- | ---------------------------- |
| `version`      | true        | The version of k6 to install |
| `architecture` | false       | Target operating system architecture for K6 to use. Examples: amd64, arm64. Will use system architecture by default. |

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
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Setup K6
        uses: im-open/setup-k6-perf-testing@v1.0.0
        with:
          version: 0.33.0

      - name: K6 Stress Test
        shell: bash
        run: |
          # Set open file limit to maximum. Has to be set in this step to take affect.
          ulimit -n 1048576
          # Run your test.
          k6 run check-health-simple.js
```

## Recompiling

If changes are made to the action's code in this repository, or its dependencies, you will need to re-compile the action.

```sh
# Installs dependencies and bundles the code
npm run build

# Bundle the code (if dependencies are already installed)
npm run bundle
```

These commands utilize [esbuild](https://esbuild.github.io/getting-started/#bundling-for-node) to bundle the action and
its dependencies into a single file located in the `dist` folder.

## Code of Conduct

This project has adopted the [im-open's Code of Conduct](https://github.com/im-open/.github/blob/master/CODE_OF_CONDUCT.md).

## License

Copyright &copy; 2021, Extend Health, LLC. Code released under the [MIT license](LICENSE).
