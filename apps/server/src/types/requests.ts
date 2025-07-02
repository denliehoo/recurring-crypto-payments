import type { Request } from 'express';

// biome-ignore lint/suspicious/noExplicitAny: <TODO: Fix>
export interface CustomRequest<ReqBody = any>
  extends Request<never, never, ReqBody> {
  // biome-ignore lint/suspicious/noExplicitAny: <TODO: Fix>
  decoded?: any;
}

export interface IDecodedAuthToken {
  email: string;
  vendorId: string;
}
