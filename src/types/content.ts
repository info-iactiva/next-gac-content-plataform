export interface IContentInputValues {
  businessName: string;
  buyerPersona: string;
  characterName: string;
  characterDescription?: string;
  authorityVoice: string;
  topic?: string;
  url?: string;
}

export interface GenerateResponse {
  content: string;
}
