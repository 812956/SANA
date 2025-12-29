#!/bin/bash

# 1. Get a child ID
echo "Fetching children..."
CHILD_RESPONSE=$(curl -s http://localhost:3001/api/children)
# Extract first id. Assuming JSON array of objects with id field.
# A bit hashy but should work for a quick test if grep supports PCRE or just simple text matching
CHILD_ID=$(echo $CHILD_RESPONSE | grep -o '"id":"[^"]*"' | head -n 1 | cut -d'"' -f4)

if [ -z "$CHILD_ID" ]; then
    echo "Could not find a child ID. Response was: $CHILD_RESPONSE"
    exit 1
fi

echo "Found Child ID: $CHILD_ID"

# 2. Submit Report
echo "Submitting report..."
curl -X POST http://localhost:3001/api/reports \
  -H "Content-Type: application/json" \
  -d '{
    "childId": "'"$CHILD_ID"'",
    "type": "NICE",
    "description": "Helping verify the system pipeline"
  }'

echo "\nReport submitted."
