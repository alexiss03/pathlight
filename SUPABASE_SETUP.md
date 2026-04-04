1. Create a Supabase project.
2. In the SQL editor, run [`supabase-schema.sql`](/Users/maryalexissolis/Documents/online-bible-study/supabase-schema.sql).
3. Open [`supabase-config.js`](/Users/maryalexissolis/Documents/online-bible-study/supabase-config.js) and fill in:
   - `url`
   - `anonKey`
4. Open the app. If config is missing or the schema is not ready, Pathlight falls back to local storage.

Default admin bootstrap:
- Email: `admin@pathlight.local`
- Password: `PathlightAdmin123!`

In Supabase mode, the first successful login with that email/password will create the admin auth account if it does not exist yet.
