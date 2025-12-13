#!/bin/bash

# Secret Encoder Script for Kestra
# Converts .env to .env_encoded with SECRET_ prefix and base64 encoding

echo "🔐 Encoding secrets for Kestra..."
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create .env from .env.example first:"
    echo "  cp .env.example .env"
    echo "  # Then edit .env with your actual secrets"
    exit 1
fi

# Create .env_encoded from .env
while IFS='=' read -r key value; do
    # Skip empty lines and comments
    if [ -z "$key" ] || [[ "$key" == \#* ]]; then
        continue
    fi
    
    # Remove any surrounding quotes from value
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
    
    # Base64 encode the value
    encoded_value=$(echo -n "$value" | base64)
    
    # Write to .env_encoded with SECRET_ prefix
    echo "SECRET_$key=$encoded_value"
done < .env > .env_encoded

echo "✅ Secrets encoded successfully!"
echo ""
echo "Created: .env_encoded"
echo ""
echo "Encoded secrets:"
grep -v '^#' .env_encoded | sed 's/=.*/=***/' || true
echo ""
echo "⚠️  IMPORTANT:"
echo "  1. .env_encoded is ready to use with docker-compose"
echo "  2. Never commit .env or .env_encoded to git!"
echo "  3. Restart Kestra: docker-compose down && docker-compose up -d"
echo ""
