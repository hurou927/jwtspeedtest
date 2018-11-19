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



# Result

Env
``` sh
$ system_profiler SPHardwareDataType
Hardware:

    Hardware Overview:

      Model Name: MacBook Pro
      Model Identifier: MacBookPro13,1
      Processor Name: Intel Core i5
      Processor Speed: 2 GHz
      Number of Processors: 1
      Total Number of Cores: 2
      L2 Cache (per Core): 256 KB
      L3 Cache: 4 MB
      Memory: 16 GB
      Boot ROM Version: MBP131.0223.B00
      SMC Version (system): 2.36f97
      Serial Number (system): C02SR0AAGVC8
      Hardware UUID: 34F609C1-9719-5DF9-AF74-9403EAE0D8EB
```


Result
``` sh
Claim, 2888, Byte
=====RSA(2048-bit)=====
sing, 1.92,ms
verify, 0.22,ms
=====ECSDA(256-bit)=====
sing, 1.13,ms
verify, 0.74,ms
```