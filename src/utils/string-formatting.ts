export function truncate(text: string, maxLength: number) {
	return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export function capitalize(text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatServerName(text: string) {
	if (text.length > 50) return text.slice(0, 50);
	return text.replace(/[^a-zA-Z0-9\s]/g, "");
}

export function formatServerHost(text: string) {
	if (text.length > 63) return text.slice(0, 63);
	return text.replace(/[^a-zA-Z0-9\.\-]/g, "");
}

export function formatServerPort(text: string) {
	const cleanedPort = text.replace(/\D/g, "");

	if (parseInt(cleanedPort) < 0) return "0";
	if (parseInt(cleanedPort) > 65535) return "65535";

	return cleanedPort.substring(0, 5);
}

export function formatServerId(text: string) {
	if (text.length > 50) return text.slice(0, 50);
	return text.toLowerCase().replace(/\s/g, "-");
}
