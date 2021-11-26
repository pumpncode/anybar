const {
	env,
	errors: {
		AddrInUse
	},
	listenDatagram
} = Deno;

const setupConnection = (port) => listenDatagram({ transport: "udp", port });

const defaultAnybarPort = Number(env.get("ANYBAR_PORT")) || 1738;

const minimumRegisteredPort = 2 ** 10;
const minimumDynamicPort = (2 ** 15) + (2 ** 14);
const maximumPort = (2 ** 16) - 1;

/** 
 * @param {(
 * 	"white"|
 * 	"red"|
 * 	"orange"|
 * 	"yellow"|
 * 	"green"|
 * 	"cyan"|
 * 	"blue"|
 * 	"purple"|
 * 	"black"|
 * 	"question"|
 * 	"exclamation"|
 * 	"filled"|
 * 	"hollow"
 * )} style - The style of the dot you want AnyBar to display.
 * @param {object} [ports={anybar:Number(Deno.env.get("ANYBAR_PORT"))||1738}] - The port options.
 * @param {number} [ports.anybar=Number(Deno.env.get("ANYBAR_PORT"))||1738]
 * @param {number} [deno]
 * 
 * @returns {Promise<void>}
 */
export default async (style, {
	anybar = defaultAnybarPort,
	deno
} = {
		anybar: defaultAnybarPort
	}) => {
	let currentDenoPort = deno;
	let connection;

	if (typeof currentDenoPort === "undefined") {
		for (currentDenoPort = minimumDynamicPort; currentDenoPort <= maximumPort; currentDenoPort++) {
			try {
				connection = setupConnection(currentDenoPort);

				break;
			} catch (error) {
				if (!(error instanceof AddrInUse)) {
					throw error;
				}
			}
		}

		if (currentDenoPort > maximumPort) {
			throw new RangeError(`No free ports in range ${minimumDynamicPort}-${maximumPort}. How? 🤯`);
		}
	}
	else {
		if (deno < minimumRegisteredPort) {
			throw new RangeError(`Port numbers below ${minimumRegisteredPort}, like ${deno}, are not supported.`);
		}

		if (deno > maximumPort) {
			throw new RangeError(`Port numbers above ${maximumPort}, like ${deno}, are invalid.`);
		}

		connection = setupConnection(currentDenoPort);
	}

	const encoder = new TextEncoder();

	const message = encoder.encode(style);

	await connection.send(message, { transport: "udp", port: anybar });

	connection.close();
}
