import useCart from '../store/store';
import Header from '../components/Header';
import { products } from '../lib/products';
import shallow from 'zustand/shallow';
import Image from 'next/image';

export default function Home({ allProducts }) {
	const { addTocart, updatecart, mycart } = useCart(
		(state) => ({
			addTocart: state.addTocart,
			updatecart: state.updatecart,
			mycart: state.cartContent
		}),
		shallow
	);
	console.log(mycart);

	const addProduct = (params) => {
		const product = mycart.findIndex((item) => item.id === params.id);
		console.log(product);

		if (product !== -1) {
			mycart[product].quantity++; // update the quantity of the cart
			updatecart({ params, mycart });
		} else {
			addTocart(params);
		}
	};

	return (
		<>
			<Header />
			<div className="container mx-auto pt-4">
				<div className="pb-4">PRODUCTS</div>
				<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
					{allProducts &&
						allProducts?.map((product) => (
							<a
								key={product.id}
								href="#"
								onClick={() =>
									addProduct({
										id: product.id,
										name: product.name,
										price: product.price,
										quantity: 1
									})
								}
								className="group"
							>
								<div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
									<Image
										src={product.imageSrc}
										alt={product.imageAlt}
										className="w-full h-full object-center object-cover group-hover:opacity-75"
										// loading="eager"
										priority
										width={500}
										height={500}
									/>
								</div>
								<h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
								<p className="mt-1 text-lg font-medium text-gray-900">
									${product.price}
								</p>
							</a>
						))}
				</div>
			</div>
		</>
	);
}

export const getStaticProps = () => {
	return {
		props: {
			allProducts: products
		}
	};
};
