import { Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { api } from "./constant";


export class ValidateParameter implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): any {
        let requestParams;
        if (request.baseUrl == 'channelconnector/add') {
            requestParams = api.params.createchannelconnector
        } else if (request.baseUrl == '/channelconnector') {
            requestParams = api.params.getchannelconnector
        }

        // let paramObj;
        // if (request.baseUrl.startsWith('/plan')) {
        //     paramObj = Object.keys(PlansSchema.obj)

        // } else {
        //     paramObj = Object.keys(PricingSlabsSchema.obj)
        // }

        // for (let param of requestParams) {
        // if (this.checkParamPresent(Object.keys(request.body), param)) {

        //     let reqParam = request.body[param];

        //     if (!this.checkParamType(reqParam, param)) {
        //         console.log("error 400")
        //         return response.status(400).send({
        //             status: 400,
        //             result: `${param} is of type ` +
        //                 `${typeof reqParam} but should be ${param.type}`
        //         });
        //     }
        //     // else {
        //     //     if (!this.runValidators(reqParam, param)) {
        //     //         return response.status(400).send({
        //     //             status: 400,
        //     //             result: `Validation failed for ${param}`
        //     //         });
        //     //     }
        //     // }
        // } else


        console.log("request.body")
        console.log(request.body);

        if ((Object.keys(request.body).length || Object.keys(request.query).length) != requestParams.length)
            if ((Object.keys(request.body) || Object.keys(request.query)) != requestParams) {
                let paramDifference = requestParams.filter(x => Object.keys(request.body).indexOf(x) === -1);
                this.logger.warn(`${paramDifference[0]} this is the missing parameter.`)
                return response.status(400).send({
                    status: 400,
                    result: `Insufficient parameters - ${paramDifference[0]} this is the missing parameter.`
                });
            }
        // }

        next();
    }

    // async checkParamPresent(reqParams, paramObj) {
    //     return (reqParams.includes(paramObj.param_key));
    // };

    // async checkParamType(reqParam, paramObj) {
    //     console.log("reqParam");
    //     console.log(paramObj);
    //     let a = Object.keys(PlansSchema.obj)
    //     console.log("a");
    //     console.log(a);
    //     const reqParamType = typeof reqParam;
    //     return reqParamType === paramObj.type;
    // };

    // async runValidators(reqParam, paramObj) {
    //     for (let validator of paramObj.validator_functions) {
    //         if (!validator(reqParam)) {
    //             return false
    //         }
    //     }
    //     return true;
    // };


}

