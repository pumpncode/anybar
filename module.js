const {
	listenDatagram
} = Deno;

export default async (style, anybarPort = 1738, denoPort = 8371) => {
	const connection = listenDatagram({ transport: "udp", port: denoPort });

	const encoder = new TextEncoder();

	const message = encoder.encode(status);

	await connection.send(message, { transport: "udp", port: anybarPort });

	connection.close();
}
