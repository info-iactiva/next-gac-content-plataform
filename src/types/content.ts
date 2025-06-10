export interface IContentInputValues {
  businessName: string;
  buyerPersona: string;
  characterName: string;
  characterDescription?: string;
  authorityVoice: string;
  topic?: string;
  url?: string;
  nombre_empresa?: string;
  nombre_corto_empresa?: string;    
  objetivo_publicacion?: string;
  web_site?: string;
  url_linkedIn?: string;
  desc_empresa?: string;
  texto_insp_ref?: string;
  idioma?: string;
}

export interface GenerateResponse {
  content: string;
}
