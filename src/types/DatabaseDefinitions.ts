export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      ordrer: {
        Row: {
          id: number;
          created_at: string;
          user_email: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          user_email?: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          user_email?: string;
        };
      };
      ordre_emails_der_ikke_er_sendt: {
        Row: {
          ordre_linje_id: number;
        };
        Insert: {
          ordre_linje_id?: number;
        };
        Update: {
          ordre_linje_id?: number;
        };
      };
      firmaer: {
        Row: {
          id: number;
          navn: string;
          user_email: string;
          adresse: string;
          postnr: number;
          by: string;
        };
        Insert: {
          id?: number;
          navn: string;
          user_email?: string;
          adresse: string;
          postnr: number;
          by: string;
        };
        Update: {
          id?: number;
          navn?: string;
          user_email?: string;
          adresse?: string;
          postnr?: number;
          by?: string;
        };
      };
      admins: {
        Row: {
          id: number;
          user_email: string;
        };
        Insert: {
          id?: number;
          user_email: string;
        };
        Update: {
          id?: number;
          user_email?: string;
        };
      };
      varer: {
        Row: {
          id: number;
          created_at: string | null;
          navn: string;
          pris: number;
          beskrivelse: string;
          billede: string;
          kategori: string;
          kan_kun_bestilles: string | null;
          kan_bestilles: boolean;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          navn: string;
          pris: number;
          beskrivelse?: string;
          billede?: string;
          kategori: string;
          kan_kun_bestilles?: string | null;
          kan_bestilles?: boolean;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          navn?: string;
          pris?: number;
          beskrivelse?: string;
          billede?: string;
          kategori?: string;
          kan_kun_bestilles?: string | null;
          kan_bestilles?: boolean;
        };
      };
      ordre_linjer: {
        Row: {
          id: number;
          created_at: string;
          ordre_id: number;
          vare_id: number;
          dato: string;
          antal: number;
          afsluttet: boolean;
        };
        Insert: {
          id?: number;
          created_at?: string;
          ordre_id: number;
          vare_id: number;
          dato: string;
          antal: number;
          afsluttet?: boolean;
        };
        Update: {
          id?: number;
          created_at?: string;
          ordre_id?: number;
          vare_id?: number;
          dato?: string;
          antal?: number;
          afsluttet?: boolean;
        };
      };
      citater: {
        Row: {
          id: number;
          created_at: string | null;
          citat: string | null;
          afsender: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          citat?: string | null;
          afsender?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          citat?: string | null;
          afsender?: string | null;
        };
      };
    };
    Views: {
      email_ordrer_view: {
        Row: {
          id: number | null;
          user_email: string | null;
          firma_navn: string | null;
          firma_adresse: string | null;
          firma_postnr: number | null;
          firma_by: string | null;
          antal: number | null;
          vare: string | null;
        };
      };
      ordrer_view: {
        Row: {
          id: number | null;
          user_email: string | null;
          firma: string | null;
          dato: string | null;
          antal: number | null;
          vare: string | null;
          billede: string | null;
          afsluttet: boolean | null;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

