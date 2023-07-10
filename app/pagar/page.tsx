import get from "app/get";
import { Box } from "components/box";
import Clock from "components/clock";
import { Copy } from "components/copy";
import { Main } from "components/main";
import { cookies } from "next/headers";
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

	const socket = new WebSocket(
		`wss://payments.smsdata.com/ws/${identifier?.value}`,
	);

	socket.onopen = () => {
		console.log("socket open");
	};

	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);
		console.log("socket msg", event.data);
		// handle transacciones
		// mostrar mensaje de pago recibido?
	};

	socket.onclose = (event) => {
		console.log("socket close", event);
	};

	socket.onerror = (event) => {
		console.log("socket error", event);
	};

	return (
		<Main>
			<Box>
				<h2 className="">Resumen del pedido</h2>
				<div className="card">
					<div className="gap-0 card-body">
						<div className="flex justify-between gap-2">
							<span>Importe:</span>
							<span>{data.fiat_amount} EUR</span>
						</div>
						<div className="m-0 divider" />
						<div className="flex justify-between gap-2">
							<p>Moneda seleccionada:</p>
							<p>{data.currency_id}</p>
						</div>
						<div className="m-0 divider" />
						<div className="flex justify-between gap-2">
							<p>Comercio:</p>
							<p>ACME Corp</p>
						</div>
						<div className="flex justify-between gap-2">
							<p>Fecha:</p>
							<p>
								{date.toLocaleString("es-AR", {
									dateStyle: "short",
									timeStyle: "short",
								})}
							</p>
						</div>
						<div className="m-0 divider" />
						<div className="flex justify-between gap-2">
							<p>Concepto:</p>
							<p>{data.notes}</p>
						</div>
					</div>
				</div>
			</Box>

			<Box>
				<h2>Realizar el pago</h2>
				<div className="card">
					<div className="items-center card-body">
						<Clock expiration={data.expired_time} />
						<Tabs
							payment_uri={payment_uri?.value}
							address={data.address}
							crypto_amount={data.crypto_amount}
							identifier={data.identifier}
							notes={data.notes}
						/>
						<div className="flex gap-2">
							<span>Enviar </span>
							<strong>
								<Copy>
									{data.crypto_amount} {data.currency_id}
								</Copy>
							</strong>
						</div>
						<small>
							<Copy>{data.address}</Copy>
						</small>
						{/* <small className="flex gap-2">
							<p>Etiqueta de destino: </p>
							<Copy>{¿..?}</Copy>
						</small> */}
					</div>
				</div>
			</Box>
		</Main>
	);
}
