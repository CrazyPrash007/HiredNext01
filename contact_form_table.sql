-- Create the hirednext_contact_submissions table
create table public.hirednext_contact_submissions (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    email text not null,
    phone text,
    subject text,
    message text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    status text default 'new' check (status in ('new', 'in_progress', 'completed', 'archived')),
    is_read boolean default false,
    ip_address text
);

-- Create submission tracking table
create table public.hirednext_submission_limits (
    email text primary key,
    ip_address text not null,
    submission_count int default 1,
    first_submission_at timestamp with time zone default timezone('utc'::text, now()) not null,
    last_submission_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create function to check submission limits
create or replace function check_submission_limits(p_email text, p_ip_address text)
returns boolean
language plpgsql
security definer
as $$
declare
    hourly_limit constant int := 5; -- Maximum 5 submissions per hour
    v_count int;
begin
    -- Check hourly limit
    select count(*)
    into v_count
    from public.hirednext_contact_submissions
    where (email = p_email or ip_address = p_ip_address)
    and created_at > current_timestamp - interval '1 hour';

    if v_count >= hourly_limit then
        return false;
    end if;

    return true;
end;
$$; 

-- Enable Row Level Security (RLS)
alter table public.hirednext_contact_submissions enable row level security;
alter table public.hirednext_submission_limits enable row level security;

-- Create policies for contact submissions
create policy "Enable read access for all users"
    on public.hirednext_contact_submissions
    for select
    using (true);

create policy "Enable insert access for all users"
    on public.hirednext_contact_submissions
    for insert
    with check (check_submission_limits(email, ip_address));

-- Create policies for submission limits table
create policy "Enable read access for submission limits"
    on public.hirednext_submission_limits
    for select
    using (true);

create policy "Enable insert for submission limits"
    on public.hirednext_submission_limits
    for insert
    with check (true);

create policy "Enable update for submission limits"
    on public.hirednext_submission_limits
    for update
    using (true);

-- Create index on created_at for better query performance
create index hirednext_contact_submissions_created_at_idx on public.hirednext_contact_submissions (created_at desc);
create index submission_limits_email_idx on public.hirednext_submission_limits (email);
create index submission_limits_ip_idx on public.hirednext_submission_limits (ip_address);

-- Add comments to the tables
comment on table public.hirednext_contact_submissions is 'Stores contact form submissions from the HiredNext website';
comment on table public.hirednext_submission_limits is 'Tracks submission limits per email and IP address';

