#!/usr/bin/env node
'use strict'

const envoyAddress = 'http://127.0.0.1:20000'

const main = async () => {
  // pass array in request body
  const res1 = await fetch(`${envoyAddress}/pass-array-of-objects`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        persons: [
          {first_name: 'Hello', last_name: 'World'},
          {first_name: 'Foo', last_name: 'Bar'},
        ],
      }),
    }
  )
  console.log('response status code', res1.status)
  console.log('response body', await res1.json(), '\n')

  // pass array in query string
  const res2 = await fetch(`${envoyAddress}/pass-array-of-objects?persons.first_name=Hello&persons.last_name=World&persons.first_name=Foo&persons.last_name=Bar`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  console.log('response status code', res2.status)
  console.log('response body', await res2.json())
}

main()
  .catch(console.error)
