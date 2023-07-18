"use client";

import { Main } from "components/main";

export default function Page({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<Main>
			<div className="prose">
				<h1>Ups! Hubo un error</h1>
				<button
					type="button"
					className="btn btn-block"
					onClick={() => location.assign("/")}
				>
					Volver
				</button>
			</div>
		</Main>
	);
}
