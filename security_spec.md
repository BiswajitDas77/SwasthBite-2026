# SwasthBite Security Specification

## 1. Data Invariants
- A user can only read and write their own profile, meal logs, scores, and vouchers.
- Foods collection is read-only for public (authenticated users), but some fields might be restricted if needed (though here it seems like a public database).
- Timestamps must be server-validated.
- Identity fields (userId/ownerId) must match the authenticated user.

## 2. The "Dirty Dozen" Payloads (Examples)
1. **Identity Spoofing**: Attempt to update another user's `weight_kg`.
2. **Resource Poisoning**: Use a 2MB string as a `foodId`.
3. **State Shortcutting**: Manually setting `total_score` to 100 without logging meals.
4. **Privilege Escalation**: Adding an `isAdmin: true` field to the user profile.
5. **Ghost Field Injection**: Adding `isVerified: true` to a voucher.
6. **Time Travel**: Setting `logged_at` to a future date manually.
7. **Orphaned Write**: Creating a meal log for a non-existent user.
8. **Negative Nutritional Values**: Setting `calories_per_100g` to -500.
9. **Budget Overflow**: Setting `budget_per_day` to a billion.
10. **Unauthorized Global Read**: Queries for all users' meal logs.
11. **Impersonation**: Setting `name` to string with script tags.
12. **Bypassing Fasting Rules**: Adding non-fasting food to a fasting log.

## 3. Test Cases (Summary)
- `get(/users/attacker)` should fail for `victim`.
- `create(/users/victim/meal_logs/log1)` should fail for `attacker`.
- `update(/users/victim)` with `isAdmin: true` should fail.
- `create(/foods/new_food)` should fail for non-admins (or all client SDKs if system-only).
