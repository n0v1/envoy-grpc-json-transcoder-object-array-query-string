#!/usr/bin/env sh
set -eu

echo 'generating proto descriptor set from protos...'

protoc \
  --proto_path=./ \
  --descriptor_set_out=./descriptor_set.pb \
  --include_imports \
  bookstore.proto

echo 'done'
