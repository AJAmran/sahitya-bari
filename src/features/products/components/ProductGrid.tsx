import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: any[] }) {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {products.map((product, idx) => (
        <ProductCard key={product._id || product.id} product={product} idx={idx} />
      ))}
    </section>
  );
}
