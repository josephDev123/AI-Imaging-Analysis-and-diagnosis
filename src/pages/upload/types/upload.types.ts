export type SupportedMediaKind = "image" | "video";

export interface UploadNavigationState {
  fileName: string;
  fileType: string;
  mediaKind: SupportedMediaKind;
  previewUrl: string;
}
