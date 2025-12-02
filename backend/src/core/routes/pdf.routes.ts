import { makeInvoker } from "awilix-express";
import { Router } from "express";

import pdfGenerateFromUrlControllerFactory from "../modules/pdf/generateFromUrl/controller";
import pdfGenerateFromHtmlControllerFactory from "../modules/pdf/generateFromHtml/controller";

const pdfRoutes = Router();

const pdfGenerateFromUrlController = makeInvoker(pdfGenerateFromUrlControllerFactory);
const pdfGenerateFromHtmlController = makeInvoker(pdfGenerateFromHtmlControllerFactory);

pdfRoutes.get("/url", pdfGenerateFromUrlController("handle"));
pdfRoutes.post("/html", pdfGenerateFromHtmlController("handle"));

export { pdfRoutes };