import { Request } from "express";

export interface IExpressRequestIdOptions {
  requestHeaderName?: string;
  responseHeaderName?: string;
  setResponseHeader?: boolean;
  attributeName?: string;
  customIdGenerator?: (req?: Request) => string;
}

export interface IExpressRequestIdDefaultOptions {
  requestHeaderName: string;
  responseHeaderName: string;
  setResponseHeader: boolean;
  attributeName: string;
  customIdGenerator: (req?: Request) => string;
}