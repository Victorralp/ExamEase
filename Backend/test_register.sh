#!/bin/bash

curl -v -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testadmin",
    "email": "testadmin@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "Admin",
    "role": "ROLE_ADMIN"
  }'