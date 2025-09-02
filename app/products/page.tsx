import ProductCard from "@/components/ProductCard";

type PlpProduct = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export const revalidate = 60;

export default async function ProductsPage() {
  const BASE_URL = "https://saleor.kombee.co.in";
  const query = `query Products($first: Int!, $channel: String!) {\n  products(first: $first, channel: $channel) {\n    edges {\n      node {\n        id\n        name\n        media { url }\n        pricing { priceRange { start { gross { amount } } } }\n        defaultVariant {\n          pricing {\n            price { gross { amount } }\n            priceUndiscounted { gross { amount } }\n          }\n        }\n        variants {\n          pricing {\n            price { gross { amount } }\n            priceUndiscounted { gross { amount } }\n          }\n        }\n      }\n    }\n  }\n}`;

  const res = await fetch(`${BASE_URL}/graphql/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { first: 12, channel: "online-inr" },
    }),
    next: { revalidate },
  });
  if (!res.ok) throw new Error(`Network error: ${res.status}`);
  const json = await res.json();

  type ApiProductNode = {
    id: string;
    name: string;
    media?: Array<{ url?: string }>;
    pricing?: { priceRange?: { start?: { gross?: { amount?: number } } } };
    defaultVariant?: {
      pricing?: {
        price?: { gross?: { amount?: number } };
        priceUndiscounted?: { gross?: { amount?: number } };
      };
    };
    variants?: Array<{
      pricing?: {
        price?: { gross?: { amount?: number } };
        priceUndiscounted?: { gross?: { amount?: number } };
      };
    }>;
  };
  const edges: Array<{ node: ApiProductNode }> =
    json?.data?.products?.edges ?? [];
  const products: PlpProduct[] = edges.map(({ node: n }) => {
    const image = n.media?.[0]?.url ?? "/file.svg";
    const defaultPrice =
      n.defaultVariant?.pricing?.price?.gross?.amount ??
      n.defaultVariant?.pricing?.priceUndiscounted?.gross?.amount;
    const firstVariantPrice =
      n.variants?.[0]?.pricing?.price?.gross?.amount ??
      n.variants?.[0]?.pricing?.priceUndiscounted?.gross?.amount;
    const productRangeStart = n.pricing?.priceRange?.start?.gross?.amount;
    const price = (defaultPrice ??
      firstVariantPrice ??
      productRangeStart ??
      0) as number;
    return { id: n.id, title: n.name, price, image };
  });
  console.log("Product Data :", products);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
