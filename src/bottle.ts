export interface Bottle {
    id: number;
    brandName: string;
    name: string;
    descriptionText: string;
    articles: {
        id: number;
        shortDescription: string;
        price: number;
    }
  }