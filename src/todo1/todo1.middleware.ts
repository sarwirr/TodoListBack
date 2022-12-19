import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class todo1Middleware implements NestMiddleware{
    use(req: Request, res: Response, next: (error?: any) => void) {
        console.log("test test middleware");
        next();
    }
}
