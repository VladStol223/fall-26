# GA History — Module JSON Schema Reference

## Adding a Quiz to a Module JSON

Every module JSON can have an optional `"quiz"` array. If it's present and non-empty, a **Quiz** tab automatically appears on that module's study guide page.

### Quiz Question Format

```json
"quiz": [
  {
    "q": "The question text exactly as it should appear",
    "options": [
      "Option A text",
      "Option B text",
      "Option C text",
      "Option D text"
    ],
    "correct": 1,
    "explanation": "Optional. Shown after the student submits. Explain why the answer is correct."
  }
]
```

### Field Reference

| Field         | Type     | Required | Notes                                                                 |
|---------------|----------|----------|-----------------------------------------------------------------------|
| `q`           | string   | ✓        | The question text                                                     |
| `options`     | string[] | ✓        | 2–5 answer choices; lettered A, B, C, D… automatically               |
| `correct`     | number   | ✓        | **0-based index** into `options`. `0` = A, `1` = B, `2` = C, etc.   |
| `explanation` | string   | ✗        | Shown in green (correct) or red (wrong) feedback box after submit     |

### Behavior in the UI

- Each question is its own card with a **Submit** button (disabled until an option is selected).
- After submitting: correct answer turns green, wrong choice turns red with strikethrough.
- After all questions are submitted, a **See My Results** button appears.
- Results screen shows score (e.g. `8/10`), letter grade, and a full review of every question.
- A **Retake Quiz** button resets the whole quiz.

### Example (matching the practice quiz style from class)

```json
{
  "q": "How many times did Georgia change its state flag from 2001 to 2003?",
  "options": ["1", "2", "3", "4"],
  "correct": 1,
  "explanation": "Georgia had three flags in 27 months. That required 2 changes: 1956→2001 and 2001→2003."
}
```

---

## Adding Content to Modules 1–6

When you have the `.md` reading content for a module, paste it here and the full JSON
(`overview`, `learn`, `anki`, `quiz`) will be generated from it.

### Module Status

| Module | Title                              | JSON file            | Content status |
|--------|------------------------------------|----------------------|----------------|
| 1      | Colonial Georgia                   | `Module 1/module-1.json` | ✅ Complete (30 cards + 10 quiz Qs) |
| 2      | Gold Rush & Cherokee Removal       | `Module 2/module-2.json` | ✅ Complete (32 cards + 10 quiz Qs) |
| 3      | Civil War & Reconstruction         | `Module 3/module-3.json` | ✅ Complete (30 cards + 10 quiz Qs) |
| 4      | The Early New South Period         | `Module 4/module-4.json` | ✅ Complete (30 cards + 10 quiz Qs) |
| 5      | The Great Depression and World War II | `Module 5/module-5.json` | ✅ Complete (20 cards + 10 quiz Qs) |
| 6      | Civil Rights Era                   | `Module 6/module-6.json` | ✅ Complete (27 cards + 10 quiz Qs) |
| 7      | Sunbelt Era                        | `Module 7/module-7.json` | ✅ Complete (33 cards + 10 quiz Qs) |
| 8      | Modern Georgia                     | `Module 8/module-8.json` | ✅ Complete (32 cards + 10 quiz Qs) |
