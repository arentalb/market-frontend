import { PageHeader } from "@/components/common/PageHeader.tsx";
import { CategoryTable } from "@/features/category/components/CatgeoryTable.tsx";
import { CreateCategoryDialog } from "@/features/category/components/CreateCategoryDialog.tsx";
import { useGetCategoriesQuery } from "@/features/category/api/categoryApiSlice.ts";

export function CategoryPage() {
  const { data } = useGetCategoriesQuery();
  const categories = data?.data.categories || [];

  return (
    <div>
      <PageHeader title={"جۆرەکان"} />
      <div>
        <div className={"mb-2 flex justify-between items-center"}>
          <p className={"text-2xl mb-2"}>جۆرەکان</p>
          <CreateCategoryDialog categories={categories} />
        </div>
        <CategoryTable categories={categories || []} />{" "}
      </div>
    </div>
  );
}
