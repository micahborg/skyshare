#!/bin/bash

# exit on errors
set -e

# check pwd
if [[ "$(basename $(pwd))" != "browser-ext" ]]; then
  echo "Error: You must run this script from inside the 'browser-ext' directory."
  exit 1
fi

# on main
git checkout main

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

# update manifest.json version
echo "Updating manifest.json to $VERSION"
jq --arg v "${VERSION#v}" '.version = $v' public/manifest.json > tmp.json && mv tmp.json public/manifest.json

# check if the version tag already exists
echo "Checking if tag $VERSION already exists..."
if git rev-parse "$VERSION" >/dev/null 2>&1; then
  echo "Tag $VERSION already exists. Aborting."
  exit 1
fi

# commit version bump
echo "Committing version bump to $VERSION"
git add .
git status
git commit -m "Release: $VERSION"

# tag the commit
git tag -a "$VERSION" -m "Release $VERSION"

# push commit and tag
git push && git push --tags

echo "Pushed release $VERSION successfully!"