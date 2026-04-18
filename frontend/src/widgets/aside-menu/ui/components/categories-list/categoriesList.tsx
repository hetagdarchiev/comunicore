import { categories } from '../../../model/data/categories-list.data';

import { CategoriesItem } from './category-item/categoriesItem';

export function CategoriesList() {
  return (
    <ul className='flex flex-col gap-y-2.5'>
      {categories.map((category) => (
        <CategoriesItem category={category} key={category.title} />
      ))}
    </ul>
  );
}
