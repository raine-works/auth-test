import { db, schema } from '@auth-test/orm';

export const getClientApps = async () => {
	const list = await db.query.oauthApplication.findMany();
	return list.map((clientApp) => {
		return { name: clientApp.name, redirectURLs: clientApp.redirectURLs };
	});
};

export const getClientAppByClientId = async (clientId: string) => {
	const record = await db.query.oauthApplication.findFirst({
		where: (record, { eq }) => eq(record.clientId, clientId),
	});
	if (record) {
		return {
			name: record.name,
		};
	} else {
		return undefined;
	}
};

export { db, schema };
