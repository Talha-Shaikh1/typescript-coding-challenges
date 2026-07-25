// Example 4: Semantic Versioning in Practice
// Understanding version numbers and their meaning

/**
 * SEMANTIC VERSIONING FORMAT
 *
 * Version: MAJOR.MINOR.PATCH
 * Example: 1.2.3
 *          │ │ │
 *          │ │ └─ PATCH: Bug fixes (backward compatible)
 *          │ └─── MINOR: New features (backward compatible)
 *          └───── MAJOR: Breaking changes (not backward compatible)
 */

interface Version {
  major: number
  minor: number
  patch: number
}

function parseVersion(version: string): Version {
  const [major, minor, patch] = version.split('.').map(Number)
  return { major, minor, patch }
}

/**
 * VERSION BUMP SCENARIOS
 */

const versionBumpExamples = [
  {
    scenario: "Fixed a bug in phone validation",
    currentVersion: "1.2.3",
    nextVersion: "1.2.4",  // PATCH bump
    reason: "Bug fix, no breaking changes"
  },
  {
    scenario: "Added sendImage() method",
    currentVersion: "1.2.4",
    nextVersion: "1.3.0",  // MINOR bump
    reason: "New feature, backward compatible"
  },
  {
    scenario: "Changed sendMessage() signature",
    currentVersion: "1.3.0",
    nextVersion: "2.0.0",  // MAJOR bump
    reason: "Breaking change, not backward compatible"
  },
  {
    scenario: "Fixed typo in documentation",
    currentVersion: "2.0.0",
    nextVersion: "2.0.1",  // PATCH bump
    reason: "Non-code change, still a patch"
  },
  {
    scenario: "Added webhook support + fixed bug",
    currentVersion: "2.0.1",
    nextVersion: "2.1.0",  // MINOR bump (highest level)
    reason: "New feature + bug fix = minor bump"
  }
]

/**
 * VERSION RANGES
 * How to specify acceptable version ranges in package.json
 */

const versionRanges = {
  // Caret (^): Allow minor and patch updates
  "^1.2.3": {
    meaning: ">=1.2.3 and <2.0.0",
    allows: ["1.2.3", "1.2.4", "1.3.0", "1.9.9"],
    blocks: ["2.0.0", "0.9.9"],
    useCase: "Most common - allows backward compatible updates"
  },

  // Tilde (~): Allow only patch updates
  "~1.2.3": {
    meaning: ">=1.2.3 and <1.3.0",
    allows: ["1.2.3", "1.2.4", "1.2.99"],
    blocks: ["1.3.0", "2.0.0"],
    useCase: "Conservative - only bug fixes"
  },

  // Exact version
  "1.2.3": {
    meaning: "Exactly 1.2.3",
    allows: ["1.2.3"],
    blocks: ["1.2.4", "1.3.0"],
    useCase: "Strictest - no automatic updates"
  },

  // Greater than or equal
  ">=1.2.3": {
    meaning: "1.2.3 or any higher version",
    allows: ["1.2.3", "1.3.0", "2.0.0", "99.0.0"],
    blocks: ["1.2.2", "1.0.0"],
    useCase: "Flexible - allows all updates including breaking"
  }
}

/**
 * REAL-WORLD EXAMPLE
 */

// Current WhatsApp SDK version
const sdkVersion = "0.1.0"

// Breaking change plan: Change API from callbacks to promises
const breakingChange = {
  from: "0.1.0",
  to: "1.0.0",  // Major version bump
  reason: "Changed from callbacks to promises - breaking change"
}

// Adding new feature: Template messages
const newFeature = {
  from: "1.0.0",
  to: "1.1.0",  // Minor version bump
  reason: "Added template message support - new feature, backward compatible"
}

// Bug fix: Fix webhook verification
const bugFix = {
  from: "1.1.0",
  to: "1.1.1",  // Patch version bump
  reason: "Fixed webhook signature verification - bug fix"
}

/**
 * RECOMMENDED PRACTICES
 */

const bestPractices = {
  forLibraries: {
    dependencies: "Use ^ for maximum compatibility",
    example: "\"express\": \"^4.18.0\"",
    reasoning: "Allows users to get bug fixes automatically"
  },

  forApplications: {
    dependencies: "Use exact versions or ~",
    example: "\"express\": \"4.18.0\" or \"~4.18.0\"",
    reasoning: "Prevents unexpected updates in production"
  },

  forSdks: {
    peerDependencies: "Use ^ with minimum version",
    example: "\"typescript\": \"^5.0.0\"",
    reasoning: "Let users choose their TypeScript version"
  }
}

/**
 * DEMONSTRATION
 */

console.log("📦 Semantic Versioning Examples\n")

console.log("Version Bump Scenarios:")
versionBumpExamples.forEach(({ scenario, currentVersion, nextVersion, reason }) => {
  console.log(`  ${currentVersion} → ${nextVersion}`)
  console.log(`     ${scenario}`)
  console.log(`     ${reason}\n`)
})

console.log("Version Ranges:")
console.log("  ^1.2.3 allows: 1.2.3, 1.2.4, 1.3.0 (but not 2.0.0)")
console.log("  ~1.2.3 allows: 1.2.3, 1.2.4 (but not 1.3.0)")
console.log("  1.2.3  allows: 1.2.3 only\n")

console.log("✅ Semantic Versioning understood!")

export {
  parseVersion,
  versionBumpExamples,
  versionRanges,
  breakingChange,
  newFeature,
  bugFix,
  bestPractices
}
