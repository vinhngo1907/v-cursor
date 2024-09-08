# Nestjs Monorepo Boilerplate

Check

- [monorepo docs](https://docs.nestjs.com/cli/monorepo)
- [contributing manual](./CONTRIBUTING.md)

| Statements                                                                                 | Branches                                                                       | Functions                                                                           | Lines                                                                           |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-92.67%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-64.94%25-red.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-88.09%25-yellow.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-91.5%25-brightgreen.svg?style=flat) |
---

#### Prerequisite

- Node: 14 => <= 16
- Docker
- npm install -g commitizen
- npm install -g changelog
- https://stedolan.github.io/jq/download/

#### Instalation

- install monorepo dependencies
  ```bash
  $ yarn monorepo:install
  ```
- install project dependencies
  ```bash
  $ yarn workspace <workspaceName> install
  ```
- install lib on project
  ```bash
  $ yarn workspace <workspaceName> add <libName>
  ```

---