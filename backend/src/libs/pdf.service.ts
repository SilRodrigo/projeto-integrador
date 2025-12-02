// src/libs/pdf/pdf.service.ts
import * as puppeteer from 'puppeteer';

type Browser = puppeteer.Browser;
type PDFOptions = puppeteer.PDFOptions;
type LaunchOptions = puppeteer.LaunchOptions;
type CookieParam = puppeteer.Protocol.Network.CookieParam;

let browserPromise: Promise<Browser> | null = null;

function getBrowser(launchOpts?: LaunchOptions): Promise<Browser> {
  if (!browserPromise) {
    browserPromise = puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ...launchOpts,
    }).catch((err) => {
      // reset para permitir retry em chamadas futuras
      browserPromise = null;
      throw err;
    });
  }
  return browserPromise;
}

/**
 * Normalize raw pdf result to Buffer
 */
function normalizePdfRaw(raw: Buffer | Uint8Array | undefined): Buffer {
  if (!raw) return Buffer.from([]);
  return Buffer.from(raw);
}

export function pdfFromUrl(
  url: string,
  pdfOptions: PDFOptions = {},
  navigationOptions: Record<string, any> = {},
  extra: { cookies?: any[]; headers?: Record<string, string>; viewport?: { width: number; height: number } } = {}
): Promise<Buffer> {
  let pageRef: puppeteer.Page | null = null;

  return getBrowser()
    .then((browser) => browser.newPage())
    .then((page) => {
      pageRef = page;

      if (extra.viewport) {
        // setViewport returns a promise
        return page.setViewport(extra.viewport as any).then(() => page);
      }
      return page;
    })
    .then((page) => {
      if (extra.headers) page.setExtraHTTPHeaders(extra.headers);
      if (extra.cookies && extra.cookies.length) {
        // sanitize cookies to avoid type mismatches (remove partitionKey object)
        const safeCookies = (extra.cookies || []).map((c: any) => {
          const cookie = { ...c };
          if (cookie.partitionKey && typeof cookie.partitionKey === 'object') {
            delete cookie.partitionKey;
          }
          return cookie;
        });
        // setCookie returns a promise
        return page.setCookie(...(safeCookies as any)).then(() => page);
      }
      return page;
    })
    .then((page) => {
      return page.goto(url, { waitUntil: 'networkidle0', ...navigationOptions }).then(() => page);
    })
    .then((page) => {
      // espera fonts.ready se disponível
      return page.evaluate(() => {
        // @ts-ignore
        const df = (document as any).fonts;
        if (df && df.ready) {
          // @ts-ignore
          return df.ready;
        }
        return Promise.resolve();
      }).then(() => page);
    })
    .then((page) => {
      return page.pdf({ printBackground: true, ...pdfOptions });
    })
    .then((raw) => {
      const buffer = normalizePdfRaw(raw as any);
      // tenta fechar a página, mas não falha se fechar der erro
      if (pageRef) {
        pageRef.close().catch(() => { /* ignore */ });
      }
      return buffer;
    })
    .catch((err) => {
      if (pageRef) {
        pageRef.close().catch(() => { /* ignore */ });
      }
      throw err;
    });
}

export function pdfFromHtml(
  html: string,
  pdfOptions: PDFOptions = {},
  extra: { viewport?: { width: number; height: number } } = {}
): Promise<Buffer> {
  let pageRef: puppeteer.Page | null = null;

  return getBrowser()
    .then((browser) => browser.newPage())
    .then((page) => {
      pageRef = page;
      if (extra.viewport) {
        return page.setViewport(extra.viewport as any).then(() => page);
      }
      return page;
    })
    .then((page) => page.setContent(html, { waitUntil: 'networkidle0' }).then(() => page))
    .then((page) => {
      return page.evaluate(() => {
        // @ts-ignore
        const df = (document as any).fonts;
        if (df && df.ready) {
          // @ts-ignore
          return df.ready;
        }
        return Promise.resolve();
      }).then(() => page);
    })
    .then((page) => page.pdf({ printBackground: true, ...pdfOptions }))
    .then((raw) => {
      const buffer = normalizePdfRaw(raw as any);
      if (pageRef) pageRef.close().catch(() => { /* ignore */ });
      return buffer;
    })
    .catch((err) => {
      if (pageRef) pageRef.close().catch(() => { /* ignore */ });
      throw err;
    });
}

export function closeBrowser(): Promise<void> {
  if (!browserPromise) return Promise.resolve();
  return browserPromise
    .then((b) => b.close())
    .catch(() => { /* ignore */ })
    .then(() => {
      browserPromise = null;
    });
}
