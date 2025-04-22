#!/bin/bash

BASE_URL="http://localhost:8000/api"

# Test register endpoint
echo "Testing register endpoint..."
register_response=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "role": "ROLE_STUDENT"
  }')
echo "Register Response: $register_response"
echo

# Test login endpoint
echo "Testing login endpoint..."
login_response=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }')
echo "Login Response: $login_response"
echo

# Extract token from login response
token=$(echo $login_response | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
echo "Token: $token"
echo

if [ -n "$token" ]; then
  # Test protected endpoint (get all exams)
  echo "Testing protected endpoint (get all exams)..."
  exams_response=$(curl -s -X GET "$BASE_URL/exams" \
    -H "Authorization: Bearer $token")
  echo "Exams Response: $exams_response"
  echo
else
  echo "No token available. Skipping protected endpoint test."
fi