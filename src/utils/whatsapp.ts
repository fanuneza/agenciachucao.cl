export function buildWhatsAppUrl(number: string, message?: string): string {
  const url = new URL(`https://wa.me/${number}`);
  if (message) {
    url.searchParams.set("text", message);
  }
  return url.toString();
}
