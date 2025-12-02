import { Response } from "express";
import { errorResponse } from "../../../../helpers/response";
import { IController } from "../../../../types/Controller";
import { IPdfGenerateFromHtmlUseCase } from "./useCase";

interface IFactoryParams {
    pdfGenerateFromHtmlUseCase: IPdfGenerateFromHtmlUseCase;
}

export interface IPdfGenerateFromHtmlController extends IController<Buffer> { }

export default function pdfGenerateFromHtmlControllerFactory({
    pdfGenerateFromHtmlUseCase
}: IFactoryParams): IPdfGenerateFromHtmlController {
    return {
        handle: async (request, response: Response): Promise<Response> => {
            try {
                const { html } = request.body;
                const { data, message } = await pdfGenerateFromHtmlUseCase.execute({ html });

                if (Buffer.isBuffer(data)) {
                    const filename = String(request.body.filename || "relatorio.pdf");
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
