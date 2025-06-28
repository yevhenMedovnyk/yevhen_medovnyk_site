export interface IOrder {
	_id: string;
	orderId: string;
	amount: number;
	comment: string;
	dateCreate: string;
	delivery_branch_address: string;
	delivery_method_desc: string;
	generalStatus: string;
	deliveryRecipientInfo: IPersonInfo;
	mainClientInfo: IPersonInfo;
	products: {
		_id: string;
		name: string;
		price: number;
		cnt: number;
		code_product: string;
	}[];
	__v: number;
}

export interface IPersonInfo {
	_id: string;
	first_name: string;
	last_name: string;
	phoneNumber: string;
	email?: string; // email є лише у mainClientInfo, тому опціональний
}
