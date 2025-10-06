export default {
	ConfirmDeleteButtononClick () {
		//	write code here
		// Get the stored character name and the input value
  const characterName = appsmith.store.characterToDelete_name;
  const inputName = DeleteConfirmInput.text.trim();
  
  if (inputName === characterName) {
    // Names match, proceed with deletion
    deleteCharacter.run({ characterId: appsmith.store.characterToDelete_id })
      .then(() => {
        showAlert('Character deleted successfully', 'success');
        fetchUserCharacters.run(); // Refresh the table
        DeleteConfirmationModal.isVisible(false); // Close modal
        // Clear stored values
        storeValue('characterToDelete_id', '');
        storeValue('characterToDelete_name', '');
        DeleteConfirmInput.setValue(''); // Clear input
      })
      .catch(() => {
        showAlert('Error deleting character', 'error');
      });
  } else {
    showAlert('Name does not match. Deletion cancelled.', 'error');
    DeleteConfirmInput.setValue(''); // Clear input for retry
  }
	}
}