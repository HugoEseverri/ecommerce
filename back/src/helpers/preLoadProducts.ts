import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  {
    name: "iPhone 11",
    price: 699,
    description:
      "Experience power and elegance with the iPhone 11: capture stunning moments with its dual-camera system, enjoy exceptional performance, and immerse yourself in a brilliant Liquid Retina display. Discover a world of possibilities in the palm of your hand!",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-model-unselect-gallery-2-202409_GEO_EMEA?wid=5120&hei=2880&fmt=webp&qlt=70&.v=ZnlzVUZzRWd3dlg0RllqbHhQSUpKTGdzSmpObkZCM3MrNmJ5SkhESlNDaTRsZHptRHdjK2NIOFlUUDJ5S2xadXovdld4NkVCZ3JUZXJyZ1dUb1MwM0dKTG1lVWJJT2RXQWE0Mm9rU1V0V0FJeENGdzc4VXVWWXF3SWhQL0lEUGRmOFV2cXQ2eTRMVFRwZ0FxUnBuSzFR&traceId=1",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "MacBook Air",
    price: 999,
    description:
      "Embrace efficiency and sophistication with the MacBook Air: lightweight design meets powerful performance, stunning Retina display brings your work to life, and all-day battery life keeps you productive wherever you go. Elevate your computing experience with the MacBook Air.",
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba13-m3-midnight-gallery1-202402?wid=4000&hei=3074&fmt=jpeg&qlt=90&.v=1707262727684",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "iPad Pro",
    price: 799,
    description:
      "Unleash your creativity and productivity with the iPad Pro: powerful performance, stunning Liquid Retina display, and all-day battery life make the iPad Pro the perfect tool for work and play. Transform your ideas into reality with the iPad Pro.",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-air-model-unselect-gallery-2-202405?wid=5120&hei=2880&fmt=webp&qlt=70&.v=azZtTlRzREZ3NzhWaHRDQW5YeUV0UEs0TkxxOFYxN2dtSHJMdW5sNDFVK1p4MGdFOVMzRG8xZXVzVEN1YWdzY09UVDVQbVhkcDIxQlRzeDZXVVpQSzkyUzNxNUJkYUtvMmZUbWtpbCtIZFA1WmprZVVuOXNTMU9pRW54dmpON1c&traceId=1",
    categoryId: 3,
    stock: 10,
  },
  {
    name: "Apple Watch Series 6",
    price: 399,
    description:
      "Stay connected and healthy with the Apple Watch Series 6: track your workouts, monitor your health, and stay in touch with the people and information you care about most. Experience the future of health and wellness with the Apple Watch Series 6.",
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/s10-case-unselect-gallery-1-202409?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=1724620940808",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "AirPods Pro",
    price: 249,
    description:
      "Immerse yourself in sound with the AirPods Pro: active noise cancellation, transparency mode, and customizable fit make the AirPods Pro the perfect companion for music, calls, and everything in between. Elevate your audio experience with the AirPods Pro.",
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FV1?wid=976&hei=916&fmt=jpeg&qlt=90&.v=1725492499003",
    categoryId: 5,
    stock: 10,
  },
  {
    name: "HomePod mini",
    price: 99,
    description:
      "Elevate your home audio experience with the HomePod mini: immersive sound, intelligent assistant, and smart home hub make the HomePod mini the perfect addition to your home. Enjoy a world of music, news, and more with the HomePod mini.",
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/homepod-select-202210?wid=1080&hei=1080&fmt=jpeg&qlt=90&.v=1670557209908",
    categoryId: 6,
    stock: 10,
  },
];

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};
