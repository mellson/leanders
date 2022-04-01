#!/bin/bash
export $(cat .env | grep -v '#' | awk '/=/ {print $1}')

# Fjern \" fra SUPABASE_URL
opt=$SUPABASE_URL
supabase_url="${opt%\"}"
supabase_url="${supabase_url#\"}"

# Fjern \" fra SUPABASE_PUBLIC_KEY
opt=$SUPABASE_PUBLIC_KEY
supabase_public_key="${opt%\"}"
supabase_public_key="${supabase_public_key#\"}"

npx openapi-typescript $supabase_url/rest/v1/?apikey=$supabase_public_key --output src/types/supabase.ts
