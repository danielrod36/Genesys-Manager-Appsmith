export default {
  onContinueClick: () => {
    // Store the selected mode in Appsmith's store
    storeValue('user_mode', ModeSelect.options);
    
    // Navigate based on selection
    if (ModeSelect.selectedOptionValue === 'player') {
      navigateTo('Player Characters');
    } else {
      navigateTo('GM Dashboard');
    }
  },
	
	// Authentication check for page loads
	checkAuth: () => {
  	if (!appsmith.store.is_authenticated) {
    	navigateTo('Login');
  		}
	}
}