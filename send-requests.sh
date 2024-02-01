#!/usr/bin/env sh
set -eu

ENVOY_ADDRESS='http://127.0.0.1:20000'
HEADERS='--header Accept:application/json --header Content-Type:application/json'

# pass array in request body
# both persons are returned in the response
URL="${ENVOY_ADDRESS}/pass-array-of-objects"
DATA='{
  "persons": [
    {"first_name": "Hello", "last_name": "World"},
    {"first_name": "Foo", "last_name": "Bar"}
  ]
}'
echo "\nCalling ${URL}:"
curl ${HEADERS} --data "${DATA}" --request POST "${URL}"

# pass array in query string
# note that only one person is returned (Foo Bar), the other one is lost (Hello World)
URL="${ENVOY_ADDRESS}/pass-array-of-objects?persons.first_name=Hello&persons.last_name=World&persons.first_name=Foo&persons.last_name=Bar"
echo "\nCalling ${URL}:"
curl ${HEADERS} --request POST "${URL}"
