import { StaticImageData } from "next/image";
import estacaoTotal from "../res/productsMock/estacao-total.jpg";
import balizaTopografica from "../res/productsMock/baliza-topografica.webp";
import kitPolaris from "../res/productsMock/kit-polaris.jpg";
import bateria from "../res/productsMock/betria.webp";

type ProductItems = {
  image: StaticImageData;
  productName: string;
  price: number;
  parcel: number;
};

export interface CatalogProps {
  payload: {
    productsMock: ProductItems[];
  };
}

const productsMock: ProductItems[] = [
  { image: estacaoTotal, productName: 'Estação Total', price: 199.99, parcel: 6 },
  { image: balizaTopografica, productName: 'Baliza Topográfica', price: 299.99, parcel: 12 },
  { image: kitPolaris, productName: 'Kit Polaris', price: 399.99, parcel: 12 },
  { image: bateria, productName: 'Bateria', price: 499.99, parcel: 24 },
  { image: estacaoTotal, productName: 'Estação Total 2', price: 599.99, parcel: 24 },
  { image: estacaoTotal, productName: 'Estação Total', price: 199.99, parcel: 6 },
];

export default productsMock;