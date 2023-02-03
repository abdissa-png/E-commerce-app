/* eslint-disable prettier/prettier */
export type tokens={
    access_token:string;
    refresh_token:string;
}
export type JwtPayload={
    sub:string,
    email:string
}
export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };