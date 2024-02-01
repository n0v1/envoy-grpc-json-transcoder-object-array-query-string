#!/usr/bin/env sh
set -eu

ENVOY_ADDRESS='http://127.0.0.1:20000'
HEADERS='--header Accept:application/json --header Content-Type:application/json'

# pass array in request body
# both books are returned in the response
URL="${ENVOY_ADDRESS}/echoBooks"
DATA='{
  "books": [
    {"author": "Hello", "title": "World"},
    {"author": "Foo", "title": "Bar"}
  ]
}'
echo "\nCalling ${URL}:"
curl ${HEADERS} --data "${DATA}" --request POST "${URL}"

# pass array in query string
# note that only one book is returned (Foo Bar), the other one is lost (Hello World)
URL="${ENVOY_ADDRESS}/echoBooks?books.author=Hello&books.title=World&books.author=Foo&books.title=Bar"
echo "\nCalling ${URL}:"
curl ${HEADERS} --request POST "${URL}"
