import {CookieSerializeOptions} from 'cookie'
const optionCookie:CookieSerializeOptions = {
 httpOnly: true,
 maxAge: 86400,
 domain: "localhost",
 path: "/",
 secure: true,
 sameSite: "lax",
};

const optionCookieLogout:CookieSerializeOptions = {
    httpOnly: true,
    maxAge:0,
    domain: "localhost",
    path: "/",
    secure: true,
    sameSite: "lax",
   };

export { optionCookie,optionCookieLogout };
