export {};
declare global {
  namespace Express {
    interface Request {
      txId: string;
    }
  }
}
