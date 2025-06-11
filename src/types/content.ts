export interface IContentInputValues {
      nombre_empresa:  string;
      nombre_corto_empresa?:  string;
      web_site?:  string;
      desc_empresa?:  string;
      nombre_personaje?:  string;
      descripcion_personaje?:  string;
      ultra_personalizado?:  string;
      segmento_audiencia?:  string;
      descripcion_audiencia? :  string;
      nombre_empresa_target? :  string;
      web_site_empresa_target? :  string;
      descripcion_empresa_target? :  string;
      nombre_buyer_persona? :  string;
      descripcion_buyer_persona? :  string;
      url_linkedIn_buyer_persona? :  string;
      objetivo_publicacion? :  string;
      tono_publicacion? :  string;
      texto_insp_ref? :  string;
      ia_estilo_autor? :  string;
      extension? :  string;
      idioma? :  string;
      contenido:string
  
}

export interface GenerateResponse {
  content: string;
}
