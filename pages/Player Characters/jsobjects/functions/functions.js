export default {
	// Authentication check for page loads
	checkAuth: () => {
		if (!appsmith.store.is_authenticated) {
			navigateTo('Login');
		}
	}
}
