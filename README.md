# RSA256

```
$ ssh-keygen -t rsa -b 2048 -f mac-rsa-2048
$ openssl rsa -in mac-rsa-2048  -pubout -outform PEM -out mac-rsa-2048.pub
```

# ECSDA 256

```
$ openssl ecparam -genkey -name secp256k1 -out mac-ec-256.pair
$ openssl ec -in mac-ec-256.pair -outform PEM -pubout -out mac-ec-256.pub
$ cat mac-ec-256.pair | awk 'BEGIN{flag=0}{ if($0~"BEGIN EC PRIVATE")flag=1; if(flag) print $0;}' >| mac-ec-256
```

# test
```
$ npm install
$ node jwtspeed.js
```