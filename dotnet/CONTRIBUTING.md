Please read [CONTRIBUTING](https://github.com/cucumber/gherkin/blob/main/CONTRIBUTING.md) and [RELEASING](https://github.com/cucumber/gherkin/blob/main/RELEASING.md) first.

## Run tests

### Prerequisites

Install the [.NET SDK](https://dotnet.microsoft.com/download). The required versions
are defined in the [CI workflow](https://github.com/cucumber/gherkin/blob/main/.github/workflows/test-dotnet.yml).

### MacOS/Linux

Run `make` from this directory.

### Windows

Run `dotnet build` and `dotnet test` from this directory.

The `dotnet test` command will run the unit tests and the .NET-transformed acceptance tests. This is good as a first pass check and for debugging.
For a complete verification, run the `make` command as well (or let the PR build run it for you), so that the standard version of the acceptance tests are also executed.
