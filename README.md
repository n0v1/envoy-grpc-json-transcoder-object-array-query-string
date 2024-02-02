# Passing Array of Objects via Envoy gRPC-JSON Transcoder

I noticed that Envoy sends (or at least the upstream gRPC service receives) a different protobuf message depending on how request data is sent to Envoy.

This has been filed as [Envoy issue #32143](https://github.com/envoyproxy/envoy/issues/32143).

## Data sent in request body

```shell
DATA='{
  "books": [
    {"author": "Hello", "title": "World"},
    {"author": "Foo", "title": "Bar"}
  ]
}'
curl --header 'Accept:application/json' --header 'Content-Type:application/json' --data "${DATA}" --request 'POST' 'http://127.0.0.1:20000/echoBooks'
```

-> Both books are received and returned by gRPC service.

Raw protobuf binary: [protobufs/protobuf-1.bin](protobufs/protobuf-1.bin)

`xxd protobufs/protobuf-1.bin`:
```text
00000000: 0000 0000 1c0a 0e0a 0548 656c 6c6f 1205  .........Hello..
00000010: 576f 726c 640a 0a0a 0346 6f6f 1203 4261  World....Foo..Ba
00000020: 72
```

Raw protobuf buffer sent (33 bytes):
```text
<Buffer 00 00 00 00 1c 0a 0e 0a 05 48 65 6c 6c 6f 12 05 57 6f 72 6c 64 0a 0a 0a 03 46 6f 6f 12 03 42 61 72>
```

Hex:
```text
000000001c0a0e0a0548656c6c6f1205576f726c640a0a0a03466f6f1203426172
```

As string:
```text

HelloWorld


FooBar
```

## Data sent in query string

```shell
curl --header 'Accept:application/json' --header 'Content-Type:application/json' --request 'POST' 'http://127.0.0.1:20000/echoBooks?books.author=Hello&books.title=World&books.author=Foo&books.title=Bar'
```

-> Only last book (Foo Bar) is returned by gRPC service, the other one is lost (Hello World).

Raw protobuf binary: [protobufs/protobuf-2.bin](protobufs/protobuf-2.bin)

`xxd protobufs/protobuf-2.bin`:
```text
00000000: 0000 0000 1a0a 180a 0548 656c 6c6f 1205  .........Hello..
00000010: 576f 726c 640a 0346 6f6f 1203 4261 72    World..Foo..Bar
```

Raw protobuf buffer sent (31 bytes):
```text
<Buffer 00 00 00 00 1a 0a 18 0a 05 48 65 6c 6c 6f 12 05 57 6f 72 6c 64 0a 03 46 6f 6f 12 03 42 61 72>
```

Hex:
```text
000000001a0a180a0548656c6c6f1205576f726c640a03466f6f1203426172
```

As string:
```text

HelloWorld
FooBar
```

## How to reproduce

Make sure you have Docker including Docker Compose plugin installed.

1. `docker compose build`
2. `docker compose up`
3. Send requests via curl: `./send-requests.sh` or nodejs: `./send-requests.js`
4. Observe logs of bookstore service, binary files written to `protobufs/` and server response