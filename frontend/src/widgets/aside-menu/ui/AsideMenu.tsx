import { AccordionsList } from './components/accordions-list/accordionsList';
import { CategoriesList } from './components/categories-list/categoriesList';

export function AsideMenu() {
  return (
    <aside className='flex w-full max-w-70 flex-col gap-y-2.5 bg-white py-10'>
      <h2 className='text-gray-80 px-7.5 text-[0.75rem] font-medium uppercase'>
        Меню
      </h2>
      <nav className='*:border-b-gray-ea grid gap-y-7.5 *:border-b *:pb-5'>
        <CategoriesList />
        <AccordionsList />
      </nav>
    </aside>
  );
}
