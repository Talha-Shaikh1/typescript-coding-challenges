# Exercise 1: Understanding the Problem (Conceptual)

## Instructions

This exercise has NO code. Instead, think deeply about WHY configuration exists.

---

## Scenario

Your team has 3 developers working on the WhatsApp SDK:

- **Developer A:** Uses `tsc --target ES5 app.ts` every time
- **Developer B:** Uses `tsc --target ES2020 app.ts` every time  
- **Developer C:** Just runs `tsc app.ts` (no flags)

---

## Questions to Answer

Write your answers in this file or on paper.

### Question 1: Output Differences
Will their compiled JavaScript be the same? Why or why not?

**Think about:**
- What does target do?
- How does ES5 differ from ES2020?
- What's the default target?

Your answer:
```
(Write here)
```

---

### Question 2: Production Problems
What problems could happen in production if team members use different settings?

**Think about:**
- Browser compatibility
- Runtime errors
- Deployment consistency

Your answer:
```
(Write here)
```

---

### Question 3: Type Checking Inconsistency
Developer A has `strictNullChecks: true`, Developer B has it `false`. What happens?

**Think about:**
- What bugs will A catch that B won't?
- Who is writing safer code?
- What happens when B's code merges into main?

Your answer:
```
(Write here)
```

---

### Question 4: The Solution
How can tsconfig.json solve these problems?

**Think about:**
- Team consistency
- One source of truth
- Automation

Your answer:
```
(Write here)
```

---

## Reflection

After answering, ask yourself:
- Do I understand WHY configuration exists?
- What problems does it prevent?
- Why can't we just run `tsc` without config?

**Key Insight:** Configuration isn't about complexity - it's about **consistency and safety**!

---

## Next Step

Once you understand WHY, move to Exercise 2 to actually build a config file.
