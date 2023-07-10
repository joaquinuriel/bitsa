import get from "app/get";
import { Box } from "components/box";
import { Main } from "components/main";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Resumen() {
	async function action(data: FormData) {
		"use server";

		const store = cookies();
		store.set("X-Device-Id", "7029ac02-feb1-4d4b-b9e6-0980841e45cf");

		const { identifier, payment_uri } = await get<Order>("/orders/", {
			method: "POST",
			body: {
				expected_output_amount: `${store.get("amount")?.value}`,
				input_currency: `${data.get("currency")}`,
				merchant_urlok: "https://bitnovo.com/ok",
				merchant_urlko: "https://bitnovo.com/ko",
				notes: `${store.get("concept")?.value}`,
			},
		});

		store.set("identifier", identifier);
		store.set("payment_uri", payment_uri);
		redirect("/pagar");
	}

	const store = cookies();
	const amount = store.get("amount");
	const concept = store.get("concept");

	const currencies = await get("/currencies", {
		next: { revalidate: 60 },
	});

	return (
		<Main>
			<Box>
				<h2>Resumen del pedido</h2>
				<div className="card">
					<div className="gap-0 card-body">
						<div className="flex justify-between">
							<p>Importe:</p>
							<p>{amount?.value} EUR</p>
						</div>
						<div className="m-0 divider" />
						<div className="flex justify-between">
							<p>Comercio:</p>
							<p>Demo</p>
						</div>
						<div className="flex justify-between">
							<p>Fecha:</p>
							<p>
								{new Date().toLocaleString("es-AR", {
									dateStyle: "short",
									timeStyle: "short",
								})}
							</p>
						</div>
						<div className="m-0 divider" />
						<div className="flex">
							<p className="flex-1">Concepto:</p>
							<p>{concept?.value}</p>
						</div>
					</div>
				</div>
			</Box>

			<div className="mt-7">
				<form action={action} className="form-group">
					<div className="form-field">
						<label htmlFor="currency">Selecionar moneda</label>
						<select
							name="currency"
							id="currency"
							className="appearance-none input"
						>
							{currencies.map((coin: Currency) => (
								<option key={coin.symbol} value={coin.symbol}>
									{coin.name}
								</option>
							))}
						</select>
					</div>
					<div className="form-field">
						<button type="submit" className="btn btn-primary">
							Continuar al pago
						</button>
					</div>
				</form>
			</div>
		</Main>
	);
}
