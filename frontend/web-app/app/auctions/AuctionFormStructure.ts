type FieldType = "text" | "number" | "date";

export type FieldConfig = {
  name: string;
  label: string;
  rules?: any;
  type?: FieldType;
  showOnCreateOnly?: boolean;
};

export const actionFormStructure: Array<FieldConfig | FieldConfig[]> = [
  {
    name: "make",
    label: "Make",
    rules: { required: "Make is required" },
  },
  {
    name: "model",
    label: "Model",
    rules: { required: "Model is required" },
  },
  {
    name: "color",
    label: "Color",
    rules: { required: "Color is required" },
  },
  [
    {
      name: "year",
      label: "Year",
      type: "number",
      rules: { required: "Year is required" },
    },
    {
      name: "mileage",
      label: "Mileage",
      rules: { required: "Mileage is required" },
    },
  ],
  {
    name: "imageUrl",
    label: "Image URL",
    rules: { required: "Image URL is required" },
    showOnCreateOnly: true,
  },
  [
    {
      name: "reservePrice",
      label: "Reserve price (enter 0 if no reserve)",
      type: "number",
      rules: { required: "Reserve price is required" },
      showOnCreateOnly: true,
    },
    {
      name: "auctionEnd",
      label: "Auction end date/time",
      type: "date",
      rules: { required: "Auction end date is required" },
      showOnCreateOnly: true,
    },
  ],
];
