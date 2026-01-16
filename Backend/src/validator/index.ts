import { NextFunction, Request, Response } from "express";
import { IntervalServerError } from "../utils/Error/app.error";
import logger from "../config/logger.config";
import { ZodObject } from "zod";

export const validateRequestBody = (schema : ZodObject<any>) => {
    return async (req : Request , res : Response , next : NextFunction) => {
        try { 
            await schema.parseAsync(req.body) ; 
            logger.info("Request Body is valid") ;
            next() ; 
        } catch(err){
            logger.error("Request Body is invalid!") ; 
            res.status(400).json({
                message : "Request Body is invalid !" , 
                success : false , 
                error : err
            })
        }
    }
}

export const validateQueryParam = (schema : ZodObject<any>) => {
    return async (req : Request , res : Response , next : NextFunction) => {
        try { 
            schema.parseAsync(req.query) ; 
            console.log("Query Params are Valid") ; 
            next() ; 
        } catch(err){
            res.status(400).json({
                message : "Query Params are invalid !" , 
                success : false , 
                error : err
            })
        }
    }
}