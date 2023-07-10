interface Currency {
	symbol: string;
	name: string;
	min_amount: string;
	max_amount: string;
	image: string;
	blockchain: string;
}

interface Order {
	identifier: string;
	reference: string;
	payment_uri: string;
	web_url: string;
	address: string;
	tag_memo: string;
	input_currency: string;
	expected_input_amount: number;
	rate: number;
	notes: string;
	fiat: string;
	language: string;
}
interface OrderResponse {
	identifier: string;
	reference: string;
	created_at: string;
	edited_at: string;
	status: string;
	fiat_amount: number;
	crypto_amount: number;
	unconfirmed_amount: number;
	confirmed_amount: number;
	currency_id: string;
	merchant_device_id: number;
	address: string;
	url_ko: string;
	url_ok: string;
	url_standby: string;
	expired_time: string;
	good_fee: boolean;
	notes: string;
	rbf: boolean;
	safe: boolean;
	fiat: string;
	language: string;
	percentage: number;
	balance_based: string;
	internal_data: string;
	transactions: {
		confirmed: boolean;
		currency: string;
		amount: number;
		tx_hash: string;
		block: number;
		created_at: string;
	}[];
}
