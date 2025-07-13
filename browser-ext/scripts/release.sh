#!/bin/bash

# exit on errors
set -e

# check pwd
if [[ "$(basename $(pwd))" != "browser-ext" ]]; then
  echo "Error: You must run this script from inside the 'browser-ext' directory."
  exit 1
fi

# check if on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  echo "Error: You must be on the 'main' branch to run this script. Currently on '$CURRENT_BRANCH'."
  exit 1
fi

# expected version argument
VERSION=$1

# check if version is provided
if [[ -z "$VERSION" ]]; then
  echo "Error: You must provide a version tag (e.g. v1.2.3)"
  exit 1
fi

# check for jq
if ! command -v jq &> /dev/null; then
  echo "Error: 'jq' is not installed. Please install it to continue."
  exit 1
fi

# check if version exists in CHANGELOG.md
echo "Checking if $VERSION is documented in CHANGELOG.md..."
if ! grep -q "## $VERSION" CHANGELOG.md; then
  echo "Error: Version $VERSION is not found in CHANGELOG.md. Please add an entry for this version before releasing."
  exit 1
fi

# check if the version tag already exists
echo "Checking if tag $VERSION already exists..."
if git rev-parse "$VERSION" >/dev/null 2>&1; then
  echo "Tag $VERSION already exists. Aborting."
  exit 1
fi

# update manifest.json version
echo "Updating manifest.json to $VERSION"
jq --arg v "${VERSION#v}" '.version = $v' public/manifest.json > tmp.json && mv tmp.json public/manifest.json

# check if there are staged changes
if ! git diff --cached --quiet; then
  echo "Found staged changes. Committing version bump to $VERSION"
  git status --porcelain --cached
  git commit -m "Release: $VERSION"
else
  echo "Error: No staged changes found. Please stage your changes before running this script."
  exit 1
fi

# tag the commit
git tag -a "$VERSION" -m "Release $VERSION"

# push commit and tag
git push && git push --tags

echo "Pushed release $VERSION successfully!"