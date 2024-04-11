import { graphql } from 'graphql';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { fetchSites } from '~/app/api';

//// Queries
import { getBrands } from '~/client/queries/get-brands';
import { getFeaturedProducts } from '~/client/queries/get-featured-products';
import { getNewestProducts } from '~/client/queries/get-newest-products';
import { Hero } from '~/components/hero';
import { ProductCardCarousel } from '~/components/product-card-carousel';
import { LocaleType } from '~/i18n';

import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '~/components/product-card';
import { getProducts } from '~/client/queries/get-products';

interface Props {
  params: {
    locale: LocaleType;
  };
}

export default async function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Home' });
  const messages = await getMessages({ locale });
  const [newestProducts, featuredProducts, allBrands] = await Promise.all([
    getNewestProducts(),
    getFeaturedProducts(),
    getBrands(),
  ]);

  await fetchSites();

  console.log('BRANDS', newestProducts);

  return (
    <>
      <section className="relative flex min-h-[800px] items-end">
        <Image
          src={
            'https://cdn11.bigcommerce.com/s-xfgpdj5616/images/stencil/original/image-manager/hero.jpg?t=1712795072'
          }
          height={600}
          width={700}
          alt="Hero for Airpack Backpack"
          className="absolute -z-10 flex h-full w-full object-cover"
          priority
        />
        <div className="flex flex-col gap-8 p-8 pb-16  capitalize text-white">
          <h2 className="text-8xl font-semibold uppercase">50% more space</h2>
          <h1 className="text-4xl">Airpack patented Technology</h1>
          <button className="w-max bg-blue-600 px-4 py-2">Explore Now</button>
        </div>
      </section>
      <div className="flex w-full justify-center bg-[#131313] py-4 text-white">
        <h4 className="text-4xl">
          $600,000 Raised on <span className="text-5xl font-bold">Kickstarter</span> with{' '}
          <span className="font-semibold">1567</span> backers
        </h4>
      </div>

      <section className="flex flex-wrap px-8">
        <ProductCardCarousel
          title=""
          products={newestProducts}
          showCart={false}
          showCompare={false}
          showReviews={false}
        />
      </section>
    </>
  );
}

export const runtime = 'edge';
