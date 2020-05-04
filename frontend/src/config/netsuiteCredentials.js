// Dependencies
import OAuth from "oauth-1.0a";
import crypto from "crypto";

// Generated information
const restletUrl = "https://5260046.app.netsuite.com/app/site/hosting";
const accountNumber = "5260046";
const consumerKey =
  "d2cddaa3a6443d6007bee61bed358853cd1a76e04a2f5d5d8fa3c3421a660ae9";
const consumerSecret =
  "e9efd22a553e24b8bf15e8ad3409f0abba79067a765f1a9b18056358126d5fb8";
const tokenKey =
  "c9475b002d8b3227acb15ebe46cecadcd8f9302bf8ff19a71959ad5e6b5daf70";
const tokenSecret =
  "44c728e252d950b8937ea8fc6a77f6c987c80431b5d02421a7894516e692e1f0";

// Initialize
const oauth = OAuth({
  consumer: {
    key: consumerKey,
    secret: consumerSecret
  },
  realm: accountNumber,
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto
      .createHmac("sha1", key)
      .update(base_string)
      .digest("base64");
  }
});

const requestData = {
  url: restletUrl,
  method: "GET"
};

// Note: The token is optional for some requests
const token = {
  key: tokenKey,
  secret: tokenSecret
};

const credentials = {
  headers: oauth.toHeader(oauth.authorize(requestData, token))
};

export default credentials;
