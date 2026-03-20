# Release Checklist

1. Verify the workspace is clean and the target version is correct in `package.json`.
2. Run `npm install` if dependency changes are part of the release.
3. Run `npm run lint`.
4. Run `npm run test`.
5. Run `npm run validate:package`.
6. Run `npm run codegen:check` if generator or schema inputs changed.
7. Review the packed `dist/package.json` and confirm the public API shape is unchanged for `1.x`.
8. Update release notes with any consumer-facing packaging, runtime, or migration details.
9. Create the GitHub release tag and let the publish workflow release from CI.
