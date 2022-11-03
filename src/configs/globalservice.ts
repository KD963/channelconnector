import { Injectable } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
import { PaginationTypeEnum } from "nestjs-typeorm-paginate";
import * as bcrypt from 'bcrypt';

@Injectable()
export class GlobalService {
    constructor(
        // private readonly jwtService: JwtService,
    ) { }

    // async generateToken(data): Promise<any> {
    //     try {
    //         // const expiresIn = { expiresIn: "1hr"}
    //         const token = await this.jwtService.sign(data);
    //         return token;
    //     } catch (error) {
    //         return error;
    //     }
    // }


    // async decodeToken(data: string): Promise<any> {
    //     try {
    //         const decoded = await this.jwtService.decode(data);
    //         return decoded;
    //     } catch (error) {
    //         return error;
    //     }
    // }

    // async verifyToken(token: string): Promise<any> {
    //     try {
    //         const verified = await this.jwtService.verify(token);
    //         return verified;
    //     } catch (error) {
    //         return error;
    //     }
    // }

    async pagination(page: number, limit: number, datacount: number): Promise<PaginationTypeEnum | any> {
        try {
            const take = limit
            const ppage = page || 0

            const totalpages = Math.ceil(datacount / take)
            // const pagelimit = Math.ceil(datacount/totalpages)

            const skiprecords = (ppage - 1) * limit


            return {

                current_page: ppage,
                from: 1 + skiprecords,
                to: ppage * limit,
                last_page: ppage - 1,
                per_page: limit,
                total_pages: totalpages

            }

        } catch (error) {
            return error;
        }
    }


    async GetCurrentDateTimeLocalTimeStamp(): Promise<any> {
        let dt = new Date();
        let now = new Date(dt.getTime() + 330 * 60000).getTime();
        return now;
    }

    async encodedPassword(password: string): Promise<any> {
        const SALT = "$2a$10$BSADjmNlEoYehKScGqZRBu"
        return bcrypt.hash(password, SALT)
    }






}