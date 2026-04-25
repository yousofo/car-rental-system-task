import { FormGroup } from '@angular/forms';

export function generateCode(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateNumber(length: number) {
  var result = '';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getEnumMap(enumObj: any): { label: string; value: number }[] {
  return Object.keys(enumObj)
    .slice(Object.keys(enumObj).length / 2)
    .map((key) => ({ label: key, value: enumObj[key] }));
}

export function omitKeys(obj: Object, keysToOmit: string[]): any {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !keysToOmit.includes(key)));
}

export function getFormFields(form: FormGroup, keysToGet: string[]): any {
  const raw = form.getRawValue();
  return Object.fromEntries(Object.entries(raw).filter(([key]) => keysToGet.includes(key)));
}


export async function downloadFileFromUrl(url: string, filename: string): Promise<File> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.status}`);
  }

  const blob = await response.blob();
  const ext = getExtensionFromMime(blob.type);

  const finalName = filename.includes('.') ? filename : filename + ext;

  return new File([blob], finalName, { type: blob.type });
}

const MIME_EXT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/bmp': '.bmp',
  'image/tiff': '.tiff',
  'image/webp': '.webp',
  'image/avif': '.avif',
  'image/svg+xml': '.svg',
  'image/vnd.adobe.photoshop': '.psd',
  'image/x-icon': '.ico',
  'image/vnd.microsoft.icon': '.ico',
  'image/vnd.djvu': '.djvu',
  'image/vnd.wap.wbmp': '.wbmp',
  'image/x-xcf': '.xcf',
};

function getExtensionFromMime(type: string): string {
  return MIME_EXT[type] ?? '';
}

export function cleanQuery<T extends Record<string, unknown>>(query: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined && value !== null && value !== '')
  ) as Partial<T>;
}

export function getPageFromUrl(url: string | null): number | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const page = parsed.searchParams.get('page');
    return page ? Number(page) : null;
  } catch {
    return null;
  }
}

export function generateRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}