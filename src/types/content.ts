import { IdiomaType } from "@/const/lenguajes";

export interface IContentInputValues {
      nombre_empresa:  string;
      nombre_corto_empresa?:  string;
      web_site?:  string;
      desc_empresa?:  string;
      nombre_personaje?:  string;
      descripcion_personaje?:  string;
      ultra_personalizado?:  "Si" | "No";
      segmento_audiencia?:  "A/B" | "C+" | "C" | "D+" | "D"| "E";
      descripcion_audiencia? :  string;
      nombre_empresa_target? :  string;
      web_site_empresa_target? :  string;
      descripcion_empresa_target? :  string;
      nombre_buyer_persona? :  string;
      descripcion_buyer_persona? :  string;
      url_linkedIn_buyer_persona? :  string;
      objetivo_publicacion? :  "Promocionar" | "Educar"|  "Inspirar"| "Entretener" |"Compartir testimonio" |""
      tono_publicacion? :  "Experto" | "Amigo" | "Mentor" | "Compañero" | "Amigable" | "Profesional" | "Inspiradora" | "Técnica" | "Informativa"
      texto_insp_ref? :  string;
      ia_estilo_autor? :  string;
      extension? :  "Corta" | "Media" | "Inglés" | "Larga"
      idioma? :  IdiomaType;
      contenido:string
  
}

export interface GenerateResponse {
  content: string;
}
