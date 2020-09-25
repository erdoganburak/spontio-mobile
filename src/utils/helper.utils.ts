class HelperUtilsInstance {

	public hasValueV2(value: any | null | undefined) {
		return this.isNotNullOrUndefined(value) ? value.length > 0 : false;
	}

	public isNotNullOrUndefined<T extends any>(input: null | undefined | T): input is T {
		return input != null && input !== undefined;
	}

	public validateIPAddress(ipAddress: string) {
		return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
			ipAddress
		);
	}

	public delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	public generateGuid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	public validateEmail(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

}

const HelperUtils = new HelperUtilsInstance();
export default HelperUtils;
