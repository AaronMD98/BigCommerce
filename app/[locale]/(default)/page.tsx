import { graphql } from 'graphql';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { fetchSites } from '~/app/api';

import { getFeaturedProducts } from '~/client/queries/get-featured-products';
import { getNewestProducts } from '~/client/queries/get-newest-products';
import { Hero } from '~/components/hero';
import { ProductCardCarousel } from '~/components/product-card-carousel';
import { LocaleType } from '~/i18n';

interface Props {
  params: {
    locale: LocaleType;
  };
}

export default async function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Home' });
  const messages = await getMessages({ locale });
  const [newestProducts, featuredProducts] = await Promise.all([
    getNewestProducts(),
    getFeaturedProducts(),
  ]);

  await fetchSites();

  // console.log(newestProducts);

  return (
    <>
      <section className="pb-12">
        <Hero />
      </section>
    </>
  );
}

export const runtime = 'edge';
