import type { Request } from 'express';

export interface CustomRequest<ReqBody = unknown>
  extends Request<never, never, ReqBody> {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  decoded?: any;
}
