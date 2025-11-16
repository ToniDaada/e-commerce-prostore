/* This TypeScript code snippet is extending the `Session` interface provided by the `next-auth`
library. It adds a new property `role` of type string to the `user` object within the `Session`
interface. The `& DefaultSession["user"]` part ensures that the existing properties of the `user`
object from the `DefaultSession` interface are retained while adding the new `role` property. This
allows for customizing the session data structure used by NextAuth.js. */

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  export interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}
