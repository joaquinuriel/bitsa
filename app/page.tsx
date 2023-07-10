import { Main } from "components/main";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
	async function action(data: FormData) {
		"use server";
		const store = cookies();
		store.set("amount", `${data.get("amount")}`);
		store.set("concept", `${data.get("concept")}`);
		redirect("/resumen");
	}

	const store = cookies();
	const amount = store.get("amount");
	const concept = store.get("concept");

	return (
		<Main>
			<div className="flex flex-col w-full max-w-xs gap-6">
				<h1 className="text-3xl font-bold">Crear Pago</h1>
				<form action={action} className="form-group">
					<div className="form-field">
						<label htmlFor="amount" className="form-label">
							Importe a pagar
						</label>
						<div className="form-control">
							<span className="absolute inset-y-0 inline-flex items-center text-base text-gray-400 left-3">
								EUR
							</span>
							<input
								type="number"
								name="amount"
								id="amount"
								className="pl-12 input"
								defaultValue={amount?.value}
							/>
						</div>
					</div>
					<div className="form-field">
						<label htmlFor="concept" className="form-label">
							Concepto
						</label>
						<div className="form-control">
							<input
								type="text"
								name="concept"
								id="concept"
								className="input"
								defaultValue={concept?.value}
							/>
						</div>
					</div>
					<div className="form-field">
						<div className="form-control">
							<button type="submit" className="w-full btn btn-primary">
								Crear pago
							</button>
						</div>
					</div>
				</form>
			</div>
		</Main>
	);
}
