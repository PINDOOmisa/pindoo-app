export type AttributeType = "select" | "multiselect" | "boolean" | "number" | "text";

export interface AttributeOption {
  value: string;
  label: string;
}

export interface AttributeDef {
  code: string;        // slug/ID
  label: string;       // název atributu
  type: AttributeType;
  options?: AttributeOption[];
  isFilter?: boolean;
}

export interface Subcategory {
  title: string;
  slug: string;
  attributes: AttributeDef[];
}

export interface Category {
  title: string;
  subtitle?: string;
  slug: string;
  subcategories: Subcategory[];
}
