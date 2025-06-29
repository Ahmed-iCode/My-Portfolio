# Supabase Database Setup Instructions

The application is failing because the database tables don't exist yet. You need to manually run the SQL migrations in your Supabase dashboard.

## Steps to Fix:

1. **Go to your Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Select your project

2. **Open the SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the First Migration (Create Tables)**
   Copy and paste the content from `supabase/migrations/create_portfolio_tables.sql` and click "Run"

4. **Run the Second Migration (Seed Data)**
   Create a new query and copy the content from `supabase/migrations/seed_portfolio_data.sql` and click "Run"

5. **Verify the Setup**
   - Go to "Table Editor" in your Supabase dashboard
   - You should now see the `certificates`, `projects`, and `articles` tables
   - The tables should have sample data

6. **Test Your Application**
   - Refresh your admin dashboard
   - The certificate management should now work properly

## Important Notes:

- Make sure you're connected to the correct Supabase project
- If you get permission errors, check that your RLS policies are set up correctly
- The sample data includes certificates, projects, and articles to get you started

## What the Migrations Do:

### First Migration (create_portfolio_tables.sql):
- Creates `certificates`, `projects`, and `articles` tables
- Sets up proper indexes for performance
- Enables Row Level Security (RLS)
- Creates public read policies
- Sets up automatic timestamp updates

### Second Migration (seed_portfolio_data.sql):
- Populates tables with sample data
- Includes 5 certificates, 5 projects, and 2 articles
- Provides realistic data for testing

Once you've completed these steps, your application should work without the database errors!

## Troubleshooting:

If you still see errors after running the migrations:

1. **Check Table Creation**: Go to Table Editor and verify all three tables exist
2. **Check RLS Policies**: Go to Authentication > Policies and verify policies exist
3. **Check Environment Variables**: Ensure your `.env` file has correct Supabase credentials
4. **Refresh Application**: Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)

The errors you're seeing (`relation "public.projects" does not exist`) will be resolved once the database tables are created through these migrations.