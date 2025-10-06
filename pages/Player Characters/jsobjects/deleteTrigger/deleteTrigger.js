export default {
	CharactersTableprimaryColumnscustomColumn2menuItemsmenuItemdlr2jpcqpaonClick () {
		//	write code here
		// Store the character ID and name for use in the modal
 		storeValue('characterToDelete_id', CharactersTable.selectedRow.id);
  	storeValue('characterToDelete_name', CharactersTable.selectedRow.name);
  	// Open the confirmation modal
	}
}