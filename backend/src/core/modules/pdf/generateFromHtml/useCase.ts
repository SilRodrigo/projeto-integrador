import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { pdfFromHtml } from "../../../../libs/pdf.service";

interface IRequest {
    html: string;
}

interface IFactoryParams {}

export interface IPdfGenerateFromHtmlUseCase extends IUseCase<IRequest, Buffer> { }

export default function pdfGenerateFromHtmlUseCaseFactory(
    {}: IFactoryParams
): IPdfGenerateFromHtmlUseCase {
    return {
        execute: async ({ html }) => {
            if (!html) {
                throw new Error("Missing HTML");
            }

            const pdf = await pdfFromHtml(
                html,
                { format: "A4", printBackground: true }
            );

            return withUseCaseResponse(pdf, "PDF generated successfully.");
        }
    };
}
