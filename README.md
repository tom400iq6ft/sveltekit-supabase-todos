# SvelteKit Supabase Todos App

### Supabase for the backend (Auth and DB)

A local supabase instance can be ran with Docker and the supabase cli for development purposes. `supabase start`

After cloning the repo, link the local instance with your online project `supabase link --project-ref <project-id>`

After making changes locally, diff the changes to create a migration file
`supabase db diff --local -f <name-for-change>`

Push local changes to remote
`supabase db push`

You can read more about supabase local development [here](https://supabase.com/docs/guides/cli/local-development)
and the CLI documentation [here](https://supabase.com/docs/reference/cli/)

Create a .env.local file and add the local supabase API URL and Anon Key (you will be given them when you run `supabase start`).

For production, you will add the remote supabase API URL and Anon Key to the Vercel Environment Variables
