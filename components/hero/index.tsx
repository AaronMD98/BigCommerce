import Image from 'next/image';

import { Button } from '@bigcommerce/components/button';
import {
  Slideshow,
  SlideshowAutoplayControl,
  SlideshowContent,
  SlideshowControls,
  SlideshowNextIndicator,
  SlideshowPagination,
  SlideshowPreviousIndicator,
  SlideshowSlide,
} from '@bigcommerce/components/slideshow';

export const Hero = () => (
  <Slideshow className="rounded-md shadow" interval={10000}>
    <SlideshowContent>
      <SlideshowSlide>
        <div className="relative flex h-full w-full">
          <Image
            alt="an assortment of brandless products against a blank background"
            className="absolute -z-10 object-cover object-left"
            fill
            priority
            sizes="(max-width: 1536px) 100vw, 1536px"
            src={
              'https://cdn11.bigcommerce.com/s-xfgpdj5616/images/stencil/original/image-manager/c-d-x-pdx-a-82obo-unsplash.jpg?t=1712723154'
            }
          />
          <div className="flex flex-col gap-4 px-12 pb-48 pt-36">
            <h2 className="text-5xl font-black lg:text-6xl">25% Off Sale</h2>
            <p className="max-w-xl">
              Shop from our exclusive brands a recieve up to 25% any order! Limited Time Only.
            </p>
            <Button asChild className="w-fit rounded-md">
              <a href="/#">Shop now</a>
            </Button>
          </div>
        </div>
      </SlideshowSlide>
      {/* <SlideshowSlide>
        <div className="z-10 flex flex-col gap-4 px-12 pb-48 pt-36">
          <h2 className="text-5xl font-black lg:text-6xl">Great Deals</h2>
          <p className="max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <Button asChild className="w-fit rounded-md">
            <a href="/#">Shop now</a>
          </Button>
        </div>
      </SlideshowSlide>
      <SlideshowSlide>
        <div className="flex flex-col gap-4 bg-gray-100 px-12 pb-48 pt-36">
          <h2 className="text-5xl font-black lg:text-6xl">Low Prices</h2>
          <p className="max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <Button asChild className="w-fit rounded-md">
            <a href="/#">Shop now</a>
          </Button>
        </div>
      </SlideshowSlide> */}
    </SlideshowContent>
    {/* <SlideshowControls>
      <SlideshowAutoplayControl />
      <SlideshowPreviousIndicator />
      <SlideshowPagination />
      <SlideshowNextIndicator />
    </SlideshowControls> */}
  </Slideshow>
);
