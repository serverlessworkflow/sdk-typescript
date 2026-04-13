# Release Checklist

1. Verify the workspace is clean and set the target version in `package.json`.
2. Run `npm install` if dependency changes are part of the release.
3. Run `npm run lint`.
4. Run `npm run test`.
5. Run `npm run validate:package`.
6. Run `npm run codegen:check` if generator or schema inputs changed.
7. Review the packed `dist/package.json` and confirm the documented `import`, `require`, `browser`, and `types` entrypoints are correct.
8. Create the GitHub release tag using the exact format `v<package.json.version>`.
9. Confirm the target npm version is not already published, or rely on CI to fail fast during release preflight if it is.
10. Update release notes with any consumer-facing packaging, runtime, or migration details, especially browser ESM and UMD guidance.
11. Publish the GitHub release and let the workflow verify the tag/version match before publishing from `dist`.
