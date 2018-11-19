const jwt = require('jsonwebtoken');
const fs = require('fs');

const loopCount = 100;


const verifyjwt = async(token, pub)=>{
    return new Promise((resolve, reject) => {
        jwt.verify(token, pub, function (err, decoded) {
            if (err) {
                reject(err);
            }else{
                resolve(decoded);
            }
        });
    });
}

const claim = {
    users0:{
    user0: {jti: "92f46647-90a2-4174-bca9-27d7f69a8fb7",iss: "https://idp.example.com/",sub: "AccessToken",aud: ["https://api.example.com/","https://idp.example.com/"],"exp": 1485320878,"nbf": 1485317273,"iat": 1485317278 }
    , user1: { jti: "92f46647-90a2-4174-bca9-27d7f69a8fb7", iss: "https://idp.example.com/", sub: "AccessToken", aud: ["https://api.example.com/", "https://idp.example.com/"], "exp": 1485320878, "nbf": 1485317273, "iat": 1485317278 }
    , user2: { jti: "92f46647-90a2-4174-bca9-27d7f69a8fb7", iss: "https://idp.example.com/", sub: "AccessToken", aud: ["https://api.example.com/", "https://idp.example.com/"], "exp": 1485320878, "nbf": 1485317273, "iat": 1485317278 }
    , user3: { jti: "92f46647-90a2-4174-bca9-27d7f69a8fb7", iss: "https://idp.example.com/", sub: "AccessToken", aud: ["https://api.example.com/", "https://idp.example.com/"], "exp": 1485320878, "nbf": 1485317273, "iat": 1485317278 }
    , user4: { jti: "92f46647-90a2-4174-bca9-27d7f69a8fb7", iss: "https://idp.example.com/", sub: "AccessToken", aud: ["https://api.example.com/", "https://idp.example.com/"], "exp": 1485320878, "nbf": 1485317273, "iat": 1485317278 }
    , user5: { jti: "92f46647-90a2-4174-bca9-27d7f69a8fb7", iss: "https://idp.example.com/", sub: "AccessToken", aud: ["https://api.example.com/", "https://idp.example.com/"], "exp": 1485320878, "nbf": 1485317273, "iat": 1485317278 }
    , user6: { jti: "92f46647-90a2-4174-bca9-27d7f69a8fb7", iss: "https://idp.example.com/", sub: "AccessToken", aud: ["https://api.example.com/", "https://idp.example.com/"], "exp": 1485320878, "nbf": 1485317273, "iat": 1485317278 }
    , user7: { jti: "92f46647-90a2-4174-bca9-27d7f69a8fb7", iss: "https://idp.example.com/", sub: "AccessToken", aud: ["https://api.example.com/", "https://idp.example.com/"], "exp": 1485320878, "nbf": 1485317273, "iat": 1485317278 }
    , user8: { jti: "92f46647-90a2-4174-bca9-27d7f69a8fb7", iss: "https://idp.example.com/", sub: "AccessToken", aud: ["https://api.example.com/", "https://idp.example.com/"], "exp": 1485320878, "nbf": 1485317273, "iat": 1485317278 }
    , user9: { jti: "92f46647-90a2-4174-bca9-27d7f69a8fb7", iss: "https://idp.example.com/", sub: "AccessToken", aud: ["https://api.example.com/", "https://idp.example.com/"], "exp": 1485320878, "nbf": 1485317273, "iat": 1485317278 }
    , user10: { jti: "92f46647-90a2-4174-bca9-27d7f69a8fb7", iss: "https://idp.example.com/", sub: "AccessToken", aud: ["https://api.example.com/", "https://idp.example.com/"], "exp": 1485320878, "nbf": 1485317273, "iat": 1485317278 }
    , user11: { jti: "92f46647-90a2-4174-bca9-27d7f69a8fb7", iss: "https://idp.example.com/", sub: "AccessToken", aud: ["https://api.example.com/", "https://idp.example.com/"], "exp": 1485320878, "nbf": 1485317273, "iat": 1485317278 }
    , user12: { jti: "92f46647-90a2-4174-bca9-27d7f69a8fb7", iss: "https://idp.example.com/", sub: "AccessToken", aud: ["https://api.example.com/", "https://idp.example.com/"], "exp": 1485320878, "nbf": 1485317273, "iat": 1485317278 }
    }
}


const jwtrsa2048 = async () => {

    const cert = fs.readFileSync('mac-rsa-2048');
    const pub = fs.readFileSync('mac-rsa-2048.pub');
    let token;
    let decode;
    const t1 = new Date().getTime();
    for(let i=0;i<loopCount;i++){
        token = jwt.sign( claim , cert, { algorithm: 'RS256' });  
    }

    const t2 = new Date().getTime();
    for (let i = 0; i < loopCount; i++) {
        decode = await jwt.verify(token, pub);
    }
    const t3 = new Date().getTime();
    console.log(`sing, ${(t2-t1)/loopCount},ms`);
    console.log(`verify, ${(t3 - t2) / loopCount},ms`);
}



const jwtes256 = async () => {

    const cert = fs.readFileSync('key-pair.pem');
    const pub = fs.readFileSync('public.pem');
    let token;
    let decode;
    const t1 = new Date().getTime();
    for (let i = 0; i < loopCount; i++) {
        token = jwt.sign(claim, cert, { algorithm: 'ES256' });
    }

    const t2 = new Date().getTime();
    for (let i = 0; i < loopCount; i++) {
        decode = await jwt.verify(token, pub);
    }
    const t3 = new Date().getTime();
    console.log(`sing, ${(t2 - t1) / loopCount},ms`);
    console.log(`verify, ${(t3 - t2) / loopCount},ms`);
}


(async()=>{
    
    console.log(`${JSON.stringify(claim).length}`)
    await jwtrsa2048();

    await jwtes256();

})()