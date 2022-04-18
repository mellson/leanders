/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/ordre_linjer": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.ordre_linjer.id"];
          created_at?: parameters["rowFilter.ordre_linjer.created_at"];
          ordre_id?: parameters["rowFilter.ordre_linjer.ordre_id"];
          vare_id?: parameters["rowFilter.ordre_linjer.vare_id"];
          dato?: parameters["rowFilter.ordre_linjer.dato"];
          antal?: parameters["rowFilter.ordre_linjer.antal"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["ordre_linjer"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** ordre_linjer */
          ordre_linjer?: definitions["ordre_linjer"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.ordre_linjer.id"];
          created_at?: parameters["rowFilter.ordre_linjer.created_at"];
          ordre_id?: parameters["rowFilter.ordre_linjer.ordre_id"];
          vare_id?: parameters["rowFilter.ordre_linjer.vare_id"];
          dato?: parameters["rowFilter.ordre_linjer.dato"];
          antal?: parameters["rowFilter.ordre_linjer.antal"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.ordre_linjer.id"];
          created_at?: parameters["rowFilter.ordre_linjer.created_at"];
          ordre_id?: parameters["rowFilter.ordre_linjer.ordre_id"];
          vare_id?: parameters["rowFilter.ordre_linjer.vare_id"];
          dato?: parameters["rowFilter.ordre_linjer.dato"];
          antal?: parameters["rowFilter.ordre_linjer.antal"];
        };
        body: {
          /** ordre_linjer */
          ordre_linjer?: definitions["ordre_linjer"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/ordrer": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.ordrer.id"];
          created_at?: parameters["rowFilter.ordrer.created_at"];
          user_id?: parameters["rowFilter.ordrer.user_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["ordrer"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** ordrer */
          ordrer?: definitions["ordrer"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.ordrer.id"];
          created_at?: parameters["rowFilter.ordrer.created_at"];
          user_id?: parameters["rowFilter.ordrer.user_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.ordrer.id"];
          created_at?: parameters["rowFilter.ordrer.created_at"];
          user_id?: parameters["rowFilter.ordrer.user_id"];
        };
        body: {
          /** ordrer */
          ordrer?: definitions["ordrer"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/varer": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.varer.id"];
          created_at?: parameters["rowFilter.varer.created_at"];
          navn?: parameters["rowFilter.varer.navn"];
          pris?: parameters["rowFilter.varer.pris"];
          beskrivelse?: parameters["rowFilter.varer.beskrivelse"];
          billede?: parameters["rowFilter.varer.billede"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["varer"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** varer */
          varer?: definitions["varer"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.varer.id"];
          created_at?: parameters["rowFilter.varer.created_at"];
          navn?: parameters["rowFilter.varer.navn"];
          pris?: parameters["rowFilter.varer.pris"];
          beskrivelse?: parameters["rowFilter.varer.beskrivelse"];
          billede?: parameters["rowFilter.varer.billede"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.varer.id"];
          created_at?: parameters["rowFilter.varer.created_at"];
          navn?: parameters["rowFilter.varer.navn"];
          pris?: parameters["rowFilter.varer.pris"];
          beskrivelse?: parameters["rowFilter.varer.beskrivelse"];
          billede?: parameters["rowFilter.varer.billede"];
        };
        body: {
          /** varer */
          varer?: definitions["varer"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  ordre_linjer: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `ordrer.id`.<fk table='ordrer' column='id'/>
     */
    ordre_id: number;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `varer.id`.<fk table='varer' column='id'/>
     */
    vare_id: number;
    /** Format: date */
    dato: string;
    /** Format: integer */
    antal: number;
  };
  ordrer: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at: string;
    /**
     * Format: uuid
     * @default auth.uid()
     */
    user_id: string;
  };
  varer: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: character varying */
    navn: string;
    /** Format: real */
    pris: number;
    /**
     * Format: text
     * @default tekst
     */
    beskrivelse: string;
    /**
     * Format: character varying
     * @default intet_billede
     */
    billede: string;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description ordre_linjer */
  "body.ordre_linjer": definitions["ordre_linjer"];
  /** Format: bigint */
  "rowFilter.ordre_linjer.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.ordre_linjer.created_at": string;
  /** Format: bigint */
  "rowFilter.ordre_linjer.ordre_id": string;
  /** Format: bigint */
  "rowFilter.ordre_linjer.vare_id": string;
  /** Format: date */
  "rowFilter.ordre_linjer.dato": string;
  /** Format: integer */
  "rowFilter.ordre_linjer.antal": string;
  /** @description ordrer */
  "body.ordrer": definitions["ordrer"];
  /** Format: bigint */
  "rowFilter.ordrer.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.ordrer.created_at": string;
  /** Format: uuid */
  "rowFilter.ordrer.user_id": string;
  /** @description varer */
  "body.varer": definitions["varer"];
  /** Format: bigint */
  "rowFilter.varer.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.varer.created_at": string;
  /** Format: character varying */
  "rowFilter.varer.navn": string;
  /** Format: real */
  "rowFilter.varer.pris": string;
  /** Format: text */
  "rowFilter.varer.beskrivelse": string;
  /** Format: character varying */
  "rowFilter.varer.billede": string;
}

export interface operations {}

export interface external {}
