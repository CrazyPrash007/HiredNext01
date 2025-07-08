-- Create the newsletter subscriptions table
create table public.hirednext_newsletter_subscriptions (
    id uuid default gen_random_uuid() primary key,
    email text not null unique,
    subscribed_at timestamp with time zone default timezone('utc'::text, now()) not null,
    is_active boolean default true,
    ip_address text
);

-- Enable Row Level Security (RLS)
alter table public.hirednext_newsletter_subscriptions enable row level security;

-- Create policies for newsletter subscriptions
create policy "Enable read access for all users"
    on public.hirednext_newsletter_subscriptions
    for select
    using (true);

create policy "Enable insert for newsletter subscriptions"
    on public.hirednext_newsletter_subscriptions
    for insert
    with check (true);

-- Create index on email for faster lookups
create index newsletter_subscriptions_email_idx on public.hirednext_newsletter_subscriptions (email);

-- Add comment to the table
comment on table public.hirednext_newsletter_subscriptions is 'Stores newsletter subscriptions from the HiredNext website'; 