export declare type GUID = string;

export function NewGUID(): GUID {
  return self.crypto.randomUUID();
}
