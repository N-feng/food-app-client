import { Products } from "@/types-db";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  sizeId?: string;
  kitchenId?: string;
  cuisineId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Products[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      sizeId: query.sizeId,
      kitchenId: query.kitchenId,
      cuisineId: query.cuisineId,
      isFeatured: query.isFeatured,
    },
  });
  const res = await fetch(url);
  return res.json();
};

export default getProducts;
