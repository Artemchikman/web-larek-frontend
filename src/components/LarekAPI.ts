import { IOrderProposal, ICard } from '..//./types/index';
import { Api, ApiListResponse } from '../components/base/Api';

interface IWebLarekService {
	cdn: string;
	fetchProductDetails: (id: string) => Promise<ICard>;
	fetchProductList: () => Promise<ICard[]>;
	postOrder: (order: IOrderProposal) => Promise<ApiListResponse<string>>;
}

export class WebLarekApi extends Api implements IWebLarekService {
	cdn: string;
	constructor(cdn: string, baseUrl: string) {
		super(baseUrl);
		this.cdn = cdn;
	}
	fetchProductDetails(id: string): Promise<ICard> {
		return this.get(`/product/${id}`).then((data: ICard) => ({
			...data,
			image: `${this.cdn}/${data.image}`,
		}));
	}
	fetchProductList(): Promise<ICard[]> {
		return this.get('/product').then((data: ApiListResponse<ICard>) =>
			data.items.map((item) => ({
				...item,
				image: `${this.cdn}/${item.image}`,
			}))
		);
	}
	postOrder(order: IOrderProposal): Promise<ApiListResponse<string>> {
		return this.post('/order', order).then(
			(data: ApiListResponse<string>) => data
		);
	}
}
