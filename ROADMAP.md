### Phase 1: Infrastructure

- [x] Setup Vite + TS + package.json
- [x] Setup Storybook: npx storybook@latest init
- [x] Create `src/index.ts` (export file)
- [x] First Git commit and push to GitHub

#### Phase 1.5: CI/CD Pipeline

_Goal: Automate quality checks and prepare release workflow._

- [x] Dynamic Badges: Update README to reflect version/license automatically
- [x] CI Workflow (.github/workflows/ci.yml): Create a GitHub Action that runs on every push:
  - [x] Lint Check (ESLint)
  - [x] Type Check (TypeScript)
  - [x] Library Build (npm run build)
  - [x] Storybook Build (npm run build-storybook)
- [x] Release Workflow strategy: Define how versions are bumped (e.g., using npm version or Changesets) to auto-generate Git Tags.

### Phase 2: Base building blocks (Version 0.1.0 - 0.5.0)

- [x] Component Typography (headings, texts)
- [ ] Component Button
- [x] Component Card
- [x] Collor pallete, spacing, fonts

### Phase 3: Local testing

- [ ] Run `npm link` in project
- [ ] Run `npm link @artemdev04/design-system` in another project
  - This enables developing design system and see the differences in app without publishing to web

### Phase 4: Version 1.0.0 and publish

- [ ] Complete Components from Phase 1 in TODO list
- [ ] Check the Storybook documentation.
- [ ] Finalization of API (So the props wont change, hopefully).
- [ ] Release of v. 1.0.0 to npm
  - `npm publish --access public` or with use of pipeline

### Phase 5: Support & Expand

- [ ] Creating and publishing all the components in TODO

### 🚀 Release Workflow

Use **Semantic Versioning** (Major.Minor.Patch). To release a new version of the design system, follow these steps:

#### 1. Prepare the Release

Ensure all your changes are committed and the working directory is clean.

```bash
git add .
git commit -m "feat: added new Input component"
```

#### 2. Bump the Version

Run one of the following commands based on the nature of your changes:

| **Command**         | **Type**     | **When to use**                                      |
| ------------------- | ------------ | ---------------------------------------------------- |
| `npm version patch` | **Bugfix**   | Small fixes, typos, internal refactoring.            |
| `npm version minor` | **Feature**  | New components or props (backward compatible).       |
| `npm version major` | **Breaking** | Breaking changes requiring updates in consumer apps. |

_Example:_

```bash
npm version minor -m "chore: bump version to %s"
```

#### 3. Push and Publish

Push the commits and tags to GitHub. This will trigger the CI/CD pipeline which automatically publishes the package to npm (if the tests pass).

```bash
git push --follow-tags
```

    Note: Do not manually edit `package.json` version. Let npm version handle the tagging.

#### Quick Summary

When you are ready to release a version, just follow these 3 steps:

1. **Commit**: `git commit -am "Ready"`
2. **Version**: `npm version patch (or minor)`
3. **Push**: `git push --follow-tags`
