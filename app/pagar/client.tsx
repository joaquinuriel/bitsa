"use client";

import { useEffect } from "react";

export default function Socket({ id }: { id?: string }) {
	useEffect(() => {
		if (id) {
			const socket = new WebSocket(`wss://payments.smsdata.com/ws/${id}`);

			socket.onopen = () => {
				console.log("socket open");
			};

			socket.onmessage = (event) => {
				const data = JSON.parse(event.data);
				console.log("socket msg", data);
			};

			socket.onclose = (event) => {
				console.log("socket close", event);
			};

			socket.onerror = (event) => {
				console.log("socket error", event);
			};
		}
	}, [id]);

	return null;
}
