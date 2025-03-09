import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.next();
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1024mb",
    },
    responseLimit: false,
  },
};
