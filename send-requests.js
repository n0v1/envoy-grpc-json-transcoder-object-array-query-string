#!/usr/bin/env node
'use strict'

const envoyAddress = 'http://127.0.0.1:20000'

const main = async () => {
  // pass array in request body
  // both books are returned in the response
  const res1 = await fetch(`${envoyAddress}/echoBooks`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        books: [
          {author: 'Hello', title: 'World'},
          {author: 'Foo', title: 'Bar'},
        ],
      }),
    }
  )
  console.log('response status code', res1.status)
  console.log('response body', await res1.json(), '\n')

  // pass array in query string
  // note that only one book is returned (Foo Bar), the other one is lost (Hello World)
  const res2 = await fetch(`${envoyAddress}/echoBooks?books.author=Hello&books.title=World&books.author=Foo&books.title=Bar`, {
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
