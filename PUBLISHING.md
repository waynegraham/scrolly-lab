# NPM Publishing Setup Guide

## Overview
Your monorepo is now configured to publish `@wsgrah/scrolly` and `@wsgrah/scrolly-three` packages to npm using Changesets and GitHub Actions.

## Prerequisites

### 1. NPM Account Setup
You need an npm account with access to publish under the `@wsgrah` scope.

```bash
# Login to npm
npm login

# Verify you're logged in
npm whoami
```

### 2. Create NPM Access Token

1. Go to [https://www.npmjs.com/settings/YOUR_USERNAME/tokens](https://www.npmjs.com/settings/YOUR_USERNAME/tokens)
2. Click **"Generate New Token"** → **"Automation"**
3. Give it a descriptive name (e.g., "GitHub Actions - scrolly-lab")
4. Copy the token (you won't be able to see it again!)

### 3. Add GitHub Secret

1. Go to your GitHub repository: `https://github.com/waynegraham/scrolly-lab`
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm automation token
6. Click **"Add secret"**

## Publishing Workflow

### How It Works

The workflow uses [Changesets](https://github.com/changesets/changesets) to manage versioning and publishing:

1. **Create changesets** - Describe your changes
2. **Version PR** - Changesets creates a PR with version bumps
3. **Publish** - Merging the PR triggers npm publish

### Step-by-Step Publishing Process

#### 1. Make Your Changes
```bash
# Make code changes to packages/scrolly or packages/scrolly-three
git add .
git commit -m "feat: add new component"
```

#### 2. Create a Changeset
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

#### 3. Commit the Changeset
```bash
# Changesets creates a file in .changeset/
git add .changeset
git commit -m "chore: add changeset for new component"
```

#### 4. Push to Main
```bash
git push origin main
```

#### 5. Review Version PR
The GitHub Action will automatically:
- Create a PR titled **"Version Packages"**
- Update package versions based on changesets
- Generate/update CHANGELOG.md files
- Delete consumed changeset files

**Review the PR** to ensure versions and changelogs look correct.

#### 6. Publish to NPM
When you **merge the "Version Packages" PR**, the GitHub Action will:
- Build all packages
- Publish to npm
- Create git tags for the new versions

## Verifying Published Packages

After publishing, verify your packages are live:

```bash
# Check package info
npm info @wsgrah/scrolly
npm info @wsgrah/scrolly-three

# Install in a test project
npm install @wsgrah/scrolly
```

## Troubleshooting

### "403 Forbidden" Error
- Verify `NPM_TOKEN` is set correctly in GitHub secrets
- Ensure your npm token has "Automation" permissions
- Check you have publish access to `@wsgrah` scope

### "Package not found" Error
- Verify the scope `@wsgrah` exists on npm
- You may need to create it first: `npm org create wsgrah`

### Workflow Fails on Build
- Check that all packages build locally: `pnpm build`
- Review the GitHub Actions logs for specific errors

## Package Information

### @wsgrah/scrolly
- **Description**: React scroll-driven animation components powered by GSAP
- **Peer Dependencies**: React 19, GSAP 3.14+
- **Entry Points**: ESM and CJS

### @wsgrah/scrolly-three
- **Description**: React Three Fiber scroll-driven 3D animation components
- **Peer Dependencies**: React 19, Three.js, React Three Fiber, @wsgrah/scrolly
- **Entry Points**: ESM and CJS

## Next Steps

1. ✅ Verify `NPM_TOKEN` is configured in GitHub
2. ✅ Create your first changeset: `pnpm changeset`
3. ✅ Push to main and watch the workflow run
4. ✅ Review and merge the "Version Packages" PR
5. ✅ Verify packages are published on npm
