import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { IExpressRequestIdDefaultOptions, IExpressRequestIdOptions } from './interfaces/RequestIdInterfaces';

const idGenerator = (): string => {
    const uuid = randomUUID();
    return uuid;
}

const populateMissingOptions = (options?: IExpressRequestIdOptions): IExpressRequestIdDefaultOptions => {
    const defaultOptions: IExpressRequestIdDefaultOptions = {
        attributeName: options?.attributeName || 'txId',
        customIdGenerator: options?.customIdGenerator || idGenerator,
        requestHeaderName: options?.requestHeaderName || 'x-transaction-id',
        responseHeaderName: options?.responseHeaderName || options?.requestHeaderName || 'x-transaction-id',
        setResponseHeader: options?.setResponseHeader || true,

    }
    return defaultOptions
}

export const expressRequestId = (options?: IExpressRequestIdOptions) => (req: Request, res: Response, next: NextFunction): void => {
    const {
        attributeName,
        customIdGenerator,
        requestHeaderName,
        responseHeaderName,
        setResponseHeader
    } = populateMissingOptions(options);

    const prevId = req.get(requestHeaderName);
    const id = prevId === undefined ? customIdGenerator(req) : prevId;
    if (setResponseHeader) {
        res.set(responseHeaderName, id);
    }
    req[attributeName] = id;
    next();
}
