// import * as crypto from 'node:crypto';
// import * as path from 'node:path';
// import * as JWT from 'jsonwebtoken';

// function getAccessTokenKeyPair() {
//   try {
//     //accessToken
//     const accessToken = JWT.sign(data.payload, data.publicKey, {
//       // algorithm: 'RS256',
//       expiresIn: '20 days',
//     });

//     //create refresh token
//     const refreshToken = JWT.sign(data.payload, data.privateKey, {
//       // algorithm: 'RS256',
//       expiresIn: '30 days',
//     });

//     //
//     JWT.verify(accessToken, data.publicKey, (err, decode) => {
//       if (err) {
//         console.log('error verify:', err);
//       } else {
//         console.log('decode verify:', decode);
//       }
//     });

//     return { accessToken, refreshToken };
//   } catch (error) {
//     console.log('UserService ~ createTokenPair ~ error:', error);
//   }
// }

// function getRefreshTokenKeyPair() {
//   return {
//     refresh_token_private_key: 1,
//     refresh_token_public_key: 2,
//   };
// }

// export const { access_token_private_key, access_token_public_key } = getAccessTokenKeyPair();

// export const { refresh_token_private_key, refresh_token_public_key } = getRefreshTokenKeyPair();
