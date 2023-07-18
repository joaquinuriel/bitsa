import get from "app/get";
import { Box } from "components/box";
import Clock from "components/clock";
import { Copy } from "components/copy";
import { Main } from "components/main";
import { cookies } from "next/headers";
import Socket from "./client";
import { Tabs } from "./tabs";

enum PaymentMethod {
	SmartQR = 0,
	WebQR = 1,
	Web3 = 2,
}

export default async function Pagar() {
	const store = cookies();
	const identifier = store.get("identifier");
	const payment_uri = store.get("payment_uri");

	const [data] = await get<OrderResponse[]>(
		`/orders/info/${identifier?.value}`,
	);

	const date = new Date();
	date.setTime(Date.parse(data.created_at));

	return (
		<Main>
			<Socket id={identifier?.value} />
			<div className="flex flex-wrap gap-8 m-auto">
				<Box>
					<h2 className="mb-4 text-xl text-darker">Resumen del pedido</h2>
					<div className="shadow-none card bg-light5">
						<div className="gap-0 card-body">
							<div className="flex justify-between gap-16">
								<p className="lead">Importe:</p>
								<p>{data.fiat_amount} EUR</p>
							</div>
							<div className="m-0 divider" />
							<div className="flex justify-between gap-16">
								<p className="lead">Moneda seleccionada:</p>
								<p>{data.currency_id}</p>
							</div>
							<div className="m-0 divider" />
							<div className="flex justify-between gap-16">
								<p className="lead">Comercio:</p>
								<p>ACME Corp</p>
							</div>
							<div className="flex justify-between gap-16">
								<p className="lead">Fecha:</p>
								<p>
									{date.toLocaleString("es-AR", {
										dateStyle: "short",
										timeStyle: "short",
									})}
								</p>
							</div>
							<div className="m-0 divider" />
							<div className="flex justify-between gap-2">
								<p className="lead">Concepto:</p>
								<p>{data.notes}</p>
							</div>
						</div>
					</div>
				</Box>

				<Box>
					<h2 className="mb-4 text-xl text-darker">Realizar el pago</h2>
					<div className="shadow-none card bg-light5">
						<div className="items-center card-body">
							<Clock expiration={data.expired_time} />
							<Tabs
								payment_uri={payment_uri?.value}
								address={data.address}
								crypto_amount={data.crypto_amount}
								identifier={data.identifier}
								notes={data.notes}
							/>
							<div className="flex gap-2 text-darker">
								<span>Enviar </span>
								<strong className="font-bold">
									<Copy>
										{data.crypto_amount} {data.currency_id}
									</Copy>
								</strong>
							</div>
							<small className="text-darker">
								<Copy>{data.address}</Copy>
							</small>
							{/* <small className="flex gap-2">
							<p>Etiqueta de destino: </p>
							<Copy>{¿..?}</Copy>
						</small> */}
						</div>
					</div>
				</Box>
			</div>
		</Main>
	);
}
