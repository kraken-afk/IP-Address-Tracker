type IpApiResponseSuccess = {
	status: "success";
	country: string;
	countryCode: string;
	region: string;
	regionName: string;
	city: string;
	zip: string;
	lat: number;
	lon: number;
	timezone: string;
	offset: number;
	isp: string;
	org: string;
	as: string;
	query: string;
};

type IpApiResponseFail = {
	status: "fail";
	query: string;
	message: string;
};

type IpApiResponse = IpApiResponseSuccess | IpApiResponseFail;
