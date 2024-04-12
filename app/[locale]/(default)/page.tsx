// import { graphql } from 'graphql';
// import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { fetchSites } from '~/app/api';

//// Queries
import { getBrands } from '~/client/queries/get-brands';
import { getFeaturedProducts } from '~/client/queries/get-featured-products';
import { getNewestProducts } from '~/client/queries/get-newest-products';

import { ProductCardCarousel } from '~/components/product-card-carousel';
import { LocaleType } from '~/i18n';

import Image from 'next/image';
// import { ProductCard } from '~/components/product-card';
import { Button } from '~/components/ui/button';

interface Props {
  params: {
    locale: LocaleType;
  };
}

export default async function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  // const t = await getTranslations({ locale, namespace: 'Home' });
  // const messages = await getMessages({ locale });
  const [newestProducts] = await Promise.all([
    getNewestProducts(),
    // getFeaturedProducts(),
    // getBrands(),
  ]);

  await fetchSites();

  return (
    <>
      <section className="relative flex min-h-[800px] items-end">
        <Image
          src="https://cdn11.bigcommerce.com/s-xfgpdj5616/images/stencil/original/image-manager/hero.jpg?t=1712795072"
          height={600}
          width={700}
          alt="Hero for Airpack Backpack"
          className="absolute -z-10 flex h-full w-full object-cover"
          priority
        />
        <div className="flex flex-col gap-8 p-8 pb-16  capitalize text-white">
          <h2 className="text-8xl font-semibold uppercase">50% more space</h2>
          <h1 className="text-4xl">Airpack patented Technology</h1>
          <Button className="" variant="primary">
            Explore Now
          </Button>
        </div>
      </section>
      <div className="flex w-full justify-center bg-[#131313]  py-4 text-white">
        <h4 className="text-4xl">
          $600,000 Raised on <span className="text-5xl font-bold">Kickstarter</span> with{' '}
          <span className="font-semibold">1567</span> backers
        </h4>
      </div>

      <section className="flex flex-wrap">
        <ProductCardCarousel
          products={newestProducts}
          showCart={true}
          showCompare={true}
          showReviews={false}
        />
      </section>
      <section className="grid grid-cols-2 2xl:container sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0">
        {/* Product presentation section with image and title */}
        <div className="flex flex-col justify-center space-y-4 pr-4 text-right">
          <h1 className="text-2xl font-bold">The #1 Backpack for Travelers</h1>
          <p className="text-lg">
            Explore the world with our durable, comfortable, and stylish backpack designed for the
            modern traveler.
          </p>
        </div>
        <div className="animate-pulse bg-gray-400" style={{ minHeight: '500px' }} />

        <div className="animate-pulse bg-gray-400" style={{ minHeight: '500px' }} />
        <div className="flex flex-col justify-center space-y-4 pl-4">
          <h1 className="text-2xl font-bold">Lightweight & Spacious</h1>
          <p className="text-lg">
            Carry all your essentials without feeling weighed down. Our backpacks are engineered for
            optimal weight distribution.
          </p>
        </div>

        <div className="flex flex-col justify-center space-y-4 pr-4 text-right">
          <h1 className="text-2xl font-bold">Waterproof & Secure</h1>
          <p className="text-lg">
            Keep your belongings safe and dry under any weather conditions with our fully waterproof
            compartments.
          </p>
        </div>
        <div className="animate-pulse bg-gray-400" style={{ minHeight: '500px' }} />
      </section>

      <section className="m-12 flex flex-col items-center justify-center gap-4 rounded-md border bg-[#131313] p-12 text-white shadow-md ">
        {/* Warranty and shopping information */}
        <h1 className="text-4xl font-bold">3-Year Warranty</h1>
        <h2 className="mt-2 text-2xl">100-Day Return Policy</h2>
        <Button className="mt-4" variant="primary">
          Shop Now
        </Button>
      </section>
    </>
  );
}

export const runtime = 'edge';
