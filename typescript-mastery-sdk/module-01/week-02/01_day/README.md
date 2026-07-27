# 📦 Day 08: npm Package Fundamentals

**Module:** Fundamentals - Week 2  
**Focus:** Understanding npm packages and package.json

---

## 🎯 What You'll Learn Today

Today you'll master npm package fundamentals:
- What is npm and why it matters
- How to create and configure package.json
- Difference between dependencies and devDependencies
- npm scripts for automation
- Semantic versioning
- Building your first TypeScript package

---

## 📚 Study Materials

### 1. Read the Lesson
Start with `LESSON.md` for comprehensive theory.

**Time:** 30-45 minutes

### 2. Study Examples
Review all example files in `examples/`:
- `01-basic-package.json` - Package configuration
- `02-dependencies.ts` - Dependency management
- `03-npm-scripts.ts` - Script automation
- `04-semantic-versioning.ts` - Version management

**Time:** 20-30 minutes

### 3. Complete Exercises
Work through `EXERCISES.md`:
- Exercise 1: Create package.json
- Exercise 2: Categorize dependencies
- Exercise 3: Configure npm scripts
- Exercise 4: Understand versioning
- Exercise 5: Build complete SDK package.json

**Time:** 45-60 minutes

---

## 🔑 Key Concepts

### npm Basics
```bash
npm init -y              # Initialize package
npm install package      # Install dependency
npm install -D package   # Install devDependency
npm run script           # Run script
```

### package.json Structure
```json
{
  "name": "@scope/package",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": { ... },
  "dependencies": { ... },
  "devDependencies": { ... }
}
```

### Semantic Versioning
```
1.2.3
│ │ │
│ │ └─ PATCH: Bug fixes
│ └─── MINOR: New features
└───── MAJOR: Breaking changes
```

---

## ✅ Success Criteria

By the end of today, you should be able to:
- [ ] Create a proper package.json from scratch
- [ ] Differentiate between dependencies and devDependencies
- [ ] Configure useful npm scripts
- [ ] Understand semantic versioning
- [ ] Initialize a TypeScript package
- [ ] Know what fields are required for publishing

---

## 🎓 Learning Path

```
1. Read LESSON.md
   ↓
2. Study examples in examples/
   ↓
3. Complete exercises in EXERCISES.md
   ↓
4. Compare with solutions in ../../solutions/day-08/
   ↓
5. Mark progress in ../../progress/progress.md
```

---

## 💡 Why This Matters

**For WhatsApp SDK:**

Your SDK will be published as an npm package:
```bash
npm install @whatsapp-sdk/core
```

Understanding package.json is crucial for:
- ✅ Proper dependency management
- ✅ Correct build configuration
- ✅ Professional publishing workflow
- ✅ Easier maintenance

**Real Usage:**
```typescript
import { WhatsAppClient } from "@whatsapp-sdk/core"

const client = new WhatsAppClient({ ... })
```

This works because package.json defines:
- Entry point (`main`)
- Type definitions (`types`)
- What gets published (`files`)

---

## 🔗 Connections

**Previous Day (Day 07):**
- Week 1 Practice Project completed
- Ready for professional package development

**Today (Day 08):**
- npm package fundamentals
- package.json configuration
- Dependency management

**Next Day (Day 09):**
- TypeScript configuration deep dive
- tsconfig.json for libraries
- Compiler options

---

## 📝 Quick Reference

### Essential Commands:
```bash
npm init -y                    # Create package.json
npm install package            # Add dependency
npm install -D typescript      # Add devDependency
npm run build                  # Run build script
npm test                       # Run tests
npm version patch              # Bump patch version
npm publish                    # Publish to npm
```

### Package.json Essentials:
- `name` - Package identifier
- `version` - SemVer version
- `main` - Entry point
- `types` - TypeScript definitions
- `scripts` - Automation commands
- `dependencies` - Runtime packages
- `devDependencies` - Development packages

---

## 🚀 Getting Started

```bash
cd module-01-fundamentals/day-08
cat LESSON.md          # Read the lesson
ls examples/           # View examples
cat EXERCISES.md       # See exercises
```

---

## 💪 Pro Tips

1. **Always use -D for dev tools:**
   ```bash
   npm install -D typescript
   ```

2. **Check what will be published:**
   ```bash
   npm pack --dry-run
   ```

3. **Validate package.json:**
   ```bash
   npm install
   ```

4. **Use scoped packages for organizations:**
   ```
   @company/package-name
   ```

---

## 🎯 Expected Outcomes

After completing Day 08:
- ✅ Solid understanding of npm ecosystem
- ✅ Can create production-ready package.json
- ✅ Know how to manage dependencies
- ✅ Understand semantic versioning
- ✅ Ready to build TypeScript packages

---

**Time Commitment:** 1.5-2 hours  
**Difficulty:** ⭐⭐ (Beginner-Intermediate)

**Let's build professional npm packages!** 🚀
