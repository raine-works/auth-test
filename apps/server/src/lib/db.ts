import { db, schema } from '@app/orm';

export const getClientApps = async () => {
	const list = await db.query.oauthApplication.findMany();
	return list.map((clientApp) => {
		return { name: clientApp.name, redirectURLs: clientApp.redirectURLs };
	});
};

export { db, schema };
