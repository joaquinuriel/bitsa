"use client";

import { MetaMaskSDK } from "@metamask/sdk";
import { TransactionRequest, parseEther } from "ethers";
import { useCallback, useState } from "react";
import QRCode from "react-qr-code";
// import { ether  } from "ethers";

export function Tabs({
	payment_uri,
	address,
	currency_id,
	crypto_amount,
	identifier,
	notes,
}: Partial<Order & OrderResponse>) {
	const [activeTab, setActiveTab] = useState("smartqr");
	const metaMask = new MetaMaskSDK();
	const ethereum = metaMask.getProvider();
	// const ethereum = window.ethereum;
	const [account, setAccount] = useState("");

	const getAccounts = useCallback(async () => {
		if (!ethereum) return;
		const [account] = (await ethereum.request({
			method: "eth_requestAccounts",
			params: [],
		})) as string[];
		setAccount(account);
	}, [ethereum]);

	const sendTransaction = useCallback(async () => {
		if (!ethereum) return;

		const wei = parseEther(`${crypto_amount}`);
		const transaction: TransactionRequest = {
			from: account,
			to: `${address}`,
			value: wei,
		};

		ethereum.request({
			method: "eth_sendTransaction",
			params: [transaction],
		});
	}, [account, address, crypto_amount, ethereum]);

	return (
		<div className="grid gap-2">
			<div className="tabs">
				{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					onClick={() => setActiveTab("smartqr")}
					className={`px-4 py-2 tab tab-pill ${
						activeTab === "smartqr" ? "tab-active" : ""
					}`}
				>
					<p>Smart QR</p>
				</div>
				{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					onClick={() => setActiveTab("walletqr")}
					className={`px-4 py-2 tab tab-pill ${
						activeTab === "walletqr" ? "tab-active" : ""
					}`}
				>
					<p>Wallet QR</p>
				</div>
				{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					onClick={() => setActiveTab("web3")}
					className={`px-4 py-2 tab tab-pill ${
						activeTab === "web3" ? "tab-active" : ""
					}`}
				>
					<p>Web 3</p>
				</div>
			</div>

			<div hidden={activeTab !== "smartqr"}>
				<div className="p-4 bg-white">
					<QRCode value={`${payment_uri}`} />
				</div>
			</div>

			<div hidden={activeTab !== "walletqr"}>
				<div className="p-4 bg-white">
					<QRCode value={`${address}`} />
				</div>
			</div>

			<div hidden={activeTab !== "web3"}>
				<div className="flex items-center h-72">
					<button
						// disabled={currency_id !== "eth"}
						type="button"
						className="btn btn-rounded btn-active btn-block"
						onClick={() => {
							if (!ethereum) return;
							if (!account) getAccounts();
							else sendTransaction();
						}}
					>
						{ethereum ? (account ? account : "Metamask") : "Install Metamask"}
					</button>
				</div>
			</div>
		</div>
	);
}
