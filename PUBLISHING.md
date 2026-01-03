# NPM Publishing Setup Guide

## Overview
Your monorepo is configured to publish `@wsgrah/scrolly` and `@wsgrah/scrolly-three` packages to npm using Changesets and GitHub Actions with npm's Trusted Publishing (Provenance).

## Publishing Methods

You can publish packages in two ways:
1. **Automated via GitHub Actions** (recommended for releases)
2. **Manual via CLI** (for testing or quick patches)

---

## Method 1: Automated Publishing (Recommended)

### Prerequisites

#### 1. NPM Account Setup
You need an npm account with access to publish under the `@wsgrah` scope.

```bash
# Login to npm
npm login

# Verify you're logged in
npm whoami
```

#### 2. Configure Trusted Publishing (Provenance)

**Important:** npm has deprecated classic automation tokens. Use Trusted Publishing instead.

1. Go to [https://www.npmjs.com/settings/YOUR_USERNAME/tokens](https://www.npmjs.com/settings/YOUR_USERNAME/tokens)
2. Click **"Generate New Token"** → **"Granular Access Token"**
3. Configure the token:
   - **Token name**: `GitHub Actions - scrolly-lab`
   - **Expiration**: Choose appropriate duration (90 days, 1 year, or custom)
   - **Packages and scopes**: Select packages
     - Select `@wsgrah/scrolly` (Read and write)
     - Select `@wsgrah/scrolly-three` (Read and write)
   - **Organizations**: Leave empty unless needed
4. Click **"Generate Token"**
5. Copy the token (you won't be able to see it again!)

**Note:** For enhanced security, consider using npm's provenance feature which is automatically enabled when publishing from GitHub Actions.

#### 3. Add GitHub Secret

1. Go to your GitHub repository: `https://github.com/waynegraham/scrolly-lab`
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `NPM_TOKEN`
5. Value: Paste your granular access token
6. Click **"Add secret"**

### Publishing Workflow

#### How It Works

The workflow uses [Changesets](https://github.com/changesets/changesets) to manage versioning and publishing:

1. **Create changesets** - Describe your changes
2. **Version PR** - Changesets creates a PR with version bumps
3. **Publish** - Merging the PR triggers npm publish

#### Step-by-Step Publishing Process

##### 1. Make Your Changes
```bash
# Make code changes to packages/scrolly or packages/scrolly-three
git add .
git commit -m "feat: add new component"
```

##### 2. Create a Changeset
```bash
# Run the changeset CLI
pnpm changeset

# You'll be prompted:
# - Which packages changed? (select with space, confirm with enter)
# - What type of change? (patch/minor/major)
# - Describe the change (this goes in CHANGELOG.md)
```

**Example interaction:**
```
🦋  Which packages would you like to include?
◯ changed packages
  ◉ @wsgrah/scrolly
  ◯ @wsgrah/scrolly-three

🦋  What kind of change is this for @wsgrah/scrolly?
  patch (0.1.0 → 0.1.1)
❯ minor (0.1.0 → 0.2.0)
  major (0.1.0 → 1.0.0)

🦋  Please enter a summary for this change:
Added CardParallaxReveal component with stacking effect
```

##### 3. Commit the Changeset
```bash
# Changesets creates a file in .changeset/
git add .changeset
git commit -m "chore: add changeset for new component"
```

##### 4. Push to Main
```bash
git push origin main
```

##### 5. Review Version PR
The GitHub Action will automatically:
- Create a PR titled **"Version Packages"**
- Update package versions based on changesets
- Generate/update CHANGELOG.md files
- Delete consumed changeset files

**Review the PR** to ensure versions and changelogs look correct.

##### 6. Publish to NPM
When you **merge the "Version Packages" PR**, the GitHub Action will:
- Build all packages
- Publish to npm with provenance
- Create git tags for the new versions

---

## Method 2: Manual Publishing

Use manual publishing for testing, quick patches, or when you need immediate control.

### Prerequisites for Manual Publishing

1. **npm login**: Ensure you're logged in
   ```bash
   npm whoami  # Verify you're logged in
   ```

2. **Build packages**: Always build before publishing
   ```bash
   pnpm build
   ```

### Manual Publishing Steps

#### Option A: Publish Single Package

```bash
# Navigate to the package directory
cd packages/scrolly

# Dry run to see what would be published
npm publish --dry-run

# Publish to npm
npm publish --access public

# Return to root
cd ../..
```

#### Option B: Publish from Root with pnpm

```bash
# From the monorepo root

# Publish scrolly
pnpm --filter @wsgrah/scrolly publish --access public

# Publish scrolly-three (depends on scrolly, so publish scrolly first)
pnpm --filter @wsgrah/scrolly-three publish --access public
```

#### Option C: Use Package Scripts (Recommended)

Add these to your root `package.json`:

```json
"scripts": {
  "publish:scrolly": "pnpm --filter @wsgrah/scrolly build && pnpm --filter @wsgrah/scrolly publish --access public",
  "publish:scrolly-three": "pnpm --filter @wsgrah/scrolly-three build && pnpm --filter @wsgrah/scrolly-three publish --access public",
  "publish:all": "pnpm build && pnpm --filter @wsgrah/scrolly publish --access public && pnpm --filter @wsgrah/scrolly-three publish --access public"
}
```

Then run:
```bash
pnpm publish:scrolly
# or
pnpm publish:all
```

### Version Management for Manual Publishing

Before publishing manually, update the version:

```bash
# In the package directory
npm version patch  # 0.1.0 → 0.1.1
npm version minor  # 0.1.0 → 0.2.0
npm version major  # 0.1.0 → 1.0.0

# Or specify exact version
npm version 0.2.0
```

Or use changesets:
```bash
pnpm changeset version  # Applies all changesets and updates versions
```

### Important Notes for Manual Publishing

1. **`--access public`**: Required for scoped packages on first publish
2. **Build first**: Always run `pnpm build` before publishing
3. **Dependency order**: Publish `@wsgrah/scrolly` before `@wsgrah/scrolly-three`
4. **Version consistency**: Ensure versions are updated in package.json
5. **Git tags**: Consider tagging releases manually if not using changesets

---

## Verifying Published Packages

After publishing (automated or manual), verify your packages are live:

```bash
# Check package info
npm info @wsgrah/scrolly
npm info @wsgrah/scrolly-three

# Install in a test project
npm install @wsgrah/scrolly
```

## Troubleshooting

### "403 Forbidden" Error
- Verify `NPM_TOKEN` is set correctly in GitHub secrets (for automated)
- Ensure you're logged in with `npm whoami` (for manual)
- Check you have publish access to `@wsgrah` scope
- Verify your token has write permissions for the packages

### "Package not found" Error
- Verify the scope `@wsgrah` exists on npm
- You may need to create it first or request access

### Workflow Fails on Build
- Check that all packages build locally: `pnpm build`
- Review the GitHub Actions logs for specific errors

### "Classic Token Revoked" Error
- npm has deprecated classic automation tokens
- Use granular access tokens instead (see setup above)
- Update your `NPM_TOKEN` secret in GitHub

## Package Information

### @wsgrah/scrolly
- **Description**: React scroll-driven animation components powered by GSAP
- **Peer Dependencies**: React 19, GSAP 3.14+
- **Entry Points**: ESM and CJS

### @wsgrah/scrolly-three
- **Description**: React Three Fiber scroll-driven 3D animation components
- **Peer Dependencies**: React 19, Three.js, React Three Fiber, @wsgrah/scrolly
- **Entry Points**: ESM and CJS

## Quick Reference

### Automated Publishing
```bash
pnpm changeset                    # Create changeset
git add .changeset && git commit  # Commit changeset
git push origin main              # Push to trigger workflow
# → Merge "Version Packages" PR to publish
```

### Manual Publishing
```bash
pnpm build                                              # Build all packages
pnpm --filter @wsgrah/scrolly publish --access public  # Publish scrolly
pnpm --filter @wsgrah/scrolly-three publish --access public  # Publish scrolly-three
```

## Additional Resources

- [Changesets Documentation](https://github.com/changesets/changesets)
- [npm Granular Access Tokens](https://docs.npmjs.com/creating-and-viewing-access-tokens)
- [npm Provenance](https://docs.npmjs.com/generating-provenance-statements)
- [Classic Token Deprecation](https://gh.io/all-npm-classic-tokens-revoked)
