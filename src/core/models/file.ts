export interface File {
  id: string;
  name: string;
  file?: Blob | Uint8Array | ArrayBuffer | null;
  path: string;
  preview: string;
  selected?: boolean;
}

export default File;
