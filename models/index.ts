export declare class Product {
  readonly _id: string;
  readonly image: string;
  readonly images: string[];
  readonly name: string;
  readonly amount: string;
  readonly price: number;
  readonly category: string;
  readonly subCategory: string;
  readonly discountedPrice: number;
  readonly description: string;
  readonly ingredients: string;
  readonly nutritiveValue: string;
  readonly usage: string;
  readonly additionalInformation: string;
}

export declare class Category {
  readonly _id: string;
  readonly name: string;
  readonly src: string;
  readonly subCategories: string[];
}

export declare class Filtering {
  readonly _id: string;
  readonly name: string;
}

export declare class User {
  readonly _id: string;
  readonly telefonNumarası: string;
  readonly epostaAdresi: string;
  readonly address: string;
  readonly adSoyad: string;
}
