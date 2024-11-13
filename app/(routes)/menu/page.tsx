import getCategories from "@/actions/get-categories";
import Box from "@/components/box";
import Container from "@/components/container";
import FilterContainer from "@/components/filter-container";
import CategoryFilters from "./components/category-filter";
import getSizes from "@/actions/get-sizes";
import SizeFilters from "./components/size-filter";
import getKitchens from "@/actions/get-kitchens";
import KitchenFilter from "./components/kitchen-filter";
import getCuisines from "@/actions/get-cuisines";
import CuisineFilter from "./components/cuisine-filter";
import getProducts from "@/actions/get-products";
import PageContent from "./components/page-content";

export const revalidate = 0;

interface MenuProps {
  searchParams: {
    size?: string;
    isFeatured?: boolean;
    cuisine?: string;
    category?: string;
    kitchen?: string;
  };
}

export default async function MenuPage({ searchParams }: MenuProps) {
  const categories = await getCategories();
  const kitchens = await getKitchens();
  const sizes = await getSizes();
  const cuisines = await getCuisines();

  const categoryId = categories.find(item => item.name === searchParams?.category)?.id
  const sizeId = sizes.find(item => item.name === searchParams?.size)?.id
  const kitchenId = kitchens.find(item => item.name === searchParams?.kitchen)?.id
  console.log('kitchenId: ', kitchenId);
  const cuisineId = cuisines.find(item => item.name === searchParams?.cuisine)?.id
  
  const products = await getProducts({
    categoryId: categoryId,
    sizeId: sizeId,
    kitchenId: kitchenId,
    cuisineId: cuisineId,
    isFeatured: searchParams?.isFeatured,
  });

  return (
    <Container className="px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 py-12 gap-2">
        <div className="hidden md:block col-span-2 border-r border-gray-100">
          <FilterContainer>
            <CategoryFilters categories={categories} />
            <SizeFilters sizes={sizes} />
            <KitchenFilter kitchens={kitchens} />
            <CuisineFilter cuisines={cuisines} />
          </FilterContainer>
        </div>
        <Box className="col-span-12 md:col-span-10 flex-col items-start justify-start w-full">
          <PageContent products={products} />
        </Box>
      </div>
    </Container>
  );
}
