#!/bin/bash
export $(cat .env | grep -v '#' | awk '/=/ {print $1}')

# Fjern \" fra DB_URL
opt=$DB_URL
db_url="${opt%\"}"
db_url="${db_url#\"}"

npx supabase gen types typescript --db-url $db_url > src/types/DatabaseDefinitions.ts
