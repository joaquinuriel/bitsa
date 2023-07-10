import { ofetch } from "ofetch";

export default ofetch.create({
	baseURL: "https://payments.smsdata.com/api/v1/",
	headers: { "X-Device-Id": `${process.env.DEVICE_ID}` },
	// retry: 3,
});
