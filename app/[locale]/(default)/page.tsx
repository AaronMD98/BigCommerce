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

  console.log('BRANDS', allBrands);

  return (
    <>
      <section className="pb-12">
        <Hero />
      </section>
      {/* <section className="flex flex-col rounded-md">
        <h1 className="text-center text-xl font-semibold">Shop From Your Favourite Brands</h1>
        <div className="flex justify-center gap-8">
          {allBrands.map((brand) => {
            if (!brand.defaultImage) return;

            return (
              <Link href={brand.path}>
                <Image src={brand.defaultImage.url} height={300} width={300} alt={brand.name} />
                <h6 className="text-6xl font-bold uppercase ">{brand.name}</h6>
              </Link>
            );
          })}
        </div>
      </section> */}
      <section className="flex flex-wrap">
        <ProductCardCarousel
          title={'Newest Products'}
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
