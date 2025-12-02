import { Response } from "express";
import { errorResponse, successResponse } from "../../../../helpers/response";
import { IController } from "../../../../types/Controller";
import { IPdfGenerateFromUrlUseCase } from "./useCase";

interface IFactoryParams {
    pdfGenerateFromUrlUseCase: IPdfGenerateFromUrlUseCase;
}

export interface IPdfGenerateFromUrlController extends IController<Buffer> { }

export default function pdfGenerateFromUrlControllerFactory({
    pdfGenerateFromUrlUseCase
}: IFactoryParams): IPdfGenerateFromUrlController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const url = String(request.query.url || "");

                const { data, message } = await pdfGenerateFromUrlUseCase.execute({ url });

                if (Buffer.isBuffer(data)) {
                    const filename = String(request.query.filename || "relatorio.pdf");
                    response.set({
                        "Content-Type": "application/pdf",
                        "Content-Disposition": `attachment; filename="${filename}"`,
                        "Content-Length": data.length.toString()
                    });
                    return response.send(data);
                }

                return response.status(200).json({ data, message });
            } catch (err: any) {
                return errorResponse(response, err);
            }
        }
    };
}
