"use server";

import { cookies } from "next/headers";

export const getJWT = async () => {
  return cookies().get(`${process.env.NEXT_PUBLIC_JWT_NAME}`)?.value;
};

export const setJWT = async (jwt: string) => {
  cookies().set({
    name: process.env.NEXT_PUBLIC_JWT_NAME + "",
    value: jwt,
    maxAge: 60 * 60 * 24,
    sameSite: "strict",
    secure: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    httpOnly: true,
    priority: "high",
  });
  return true;
};

export const clearJWT = async () => {
  cookies().delete({
    name: process.env.NEXT_PUBLIC_JWT_NAME + "",
    maxAge: 0,
  });
  
  return true;
};