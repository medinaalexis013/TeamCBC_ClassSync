create table if not exists users(
    id uuid primary key default gen_random_uuid(),
    idp_sub text unique not null,
    email text unique not null,
    display_name text,
    role text not null default 'student',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);