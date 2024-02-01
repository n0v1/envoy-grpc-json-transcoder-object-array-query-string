#!/usr/bin/env node
'use strict'

const envoyAddress = 'http://127.0.0.1:20000'

const main = async () => {
  let url

  // pass array in request body
  // both books are returned in the response
  url = `${envoyAddress}/echoBooks`
  console.log(`Calling ${url}`)
  const res1 = await fetch(url, {
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
  console.log('status code', res1.status)
  console.log('response body', await res1.json(), '\n')

  // pass array in query string
  // note that only one book is returned (Foo Bar), the other one is lost (Hello World)
  url = `${envoyAddress}/echoBooks?books.author=Hello&books.title=World&books.author=Foo&books.title=Bar`
  console.log(`Calling ${url}`)
  const res2 = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  console.log('status code', res2.status)
  console.log('response body', await res2.json())
}

main()
  .catch(console.error)
