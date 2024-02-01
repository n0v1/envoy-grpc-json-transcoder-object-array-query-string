#!/usr/bin/env node
'use strict'

const path = require('node:path')
const util = require('node:util')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const grpcPort = 10000

util.inspect.defaultOptions.depth = 5

const protoPath = path.resolve(__dirname, 'bookstore.proto')
const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase   : true,
  defaults   : false,
  enums      : String,
  includeDirs: [
    path.resolve(__dirname, './')
  ]
})
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

const methodImplementations = {
  EchoBooks (call, callback) {
    console.log(`EchoBooks called with the following parameters:\n`, call.request, '\n')
    callback(null, {
      books: call.request.books,
    })
  },
}
server.addService(protoDescriptor.bookstore.Bookstore.service, methodImplementations)

console.log(`Starting Bookstore service`)
server.bindAsync(
  `0.0.0.0:${grpcPort}`,
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) {
      throw new Error(`Could not start gRPC server on port ${grpcPort}`, err)
    }

    server.start()
    console.log(`Bookstore service is listening on port ${grpcPort}`)
})
