/** @type {import('typedoc').TypeDocOptions} */
export default {
    entryPoints: ["src/index.ts"],
    out: "docs/api-docs",
    hideGenerator: true,
    excludePrivate: true,
    excludeExternals: true,
    navigationLinks: {
        GitHub: "https://github.com/hunteroi/discord-logger",
        Coverage: "https://hunteroi.github.io/discord-logger/coverage/lcov-report",
    }
}
