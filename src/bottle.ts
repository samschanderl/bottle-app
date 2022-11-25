export interface Bottle {
    id: number;
    brandName: string;
    name: string;
    descriptionText?: string;
    articles: Array <{
        id: number;
        shortDescription: string;
        price: number;
        unit: string;
        pricePerUnitText: string;
        image: string;
    }>
  }