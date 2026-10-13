1. Create a Supabase project.
2. In the SQL editor, run [`supabase-schema.sql`](/Users/maryalexissolis/Documents/online-bible-study/supabase-schema.sql).
   - If you already ran an older version, run it again so the new `study_circle_posts`, `study_circle_prayers`, and `study_circle_members` tables are created.
3. Open [`supabase-config.js`](/Users/maryalexissolis/Documents/online-bible-study/supabase-config.js) and fill in:
   - `url`
   - `anonKey`
4. Open the app. Production login uses Supabase and reports connection errors instead of switching accounts to local storage. Missing Study Circle tables leave the circle unavailable without disabling the rest of the app.

Render env option:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

If these Render environment variables are set, they override [`supabase-config.js`](/Users/maryalexissolis/Documents/online-bible-study/supabase-config.js) at runtime.

Production admin setup:
1. Create a user in Supabase Authentication with a password you choose.
2. Sign in once through the ordinary login page to create the member profile.
3. In Supabase SQL Editor, promote that account (replace the email):

```sql
update public.profiles set role = 'admin' where email = 'your-admin@example.com';
```

4. Sign out and use `/admin-login.html`. Admin roles and circle approvals cannot be assigned by ordinary members.

The local demo admin exists only in local browser storage. Its credentials do not create a production Supabase administrator.
