import { IUseCase, withUseCaseResponse } from "../../../../types/UseCase";
import { pdfFromUrl } from "../../../../libs/pdf.service";

interface IRequest {
    url: string;
}

interface IFactoryParams {}

export interface IPdfGenerateFromUrlUseCase extends IUseCase<IRequest, Buffer> { }

export default function pdfGenerateFromUrlUseCaseFactory(
    {}: IFactoryParams
): IPdfGenerateFromUrlUseCase {
    return {
        execute: async ({ url }) => {
            if (!url) {
                throw new Error("Missing URL");
            }

            const pdf = await pdfFromUrl(
                url,
                { format: "A4", printBackground: true },
                { timeout: 60000 }
            );

            return withUseCaseResponse(pdf, "PDF generated successfully.");
        }
    };
}
