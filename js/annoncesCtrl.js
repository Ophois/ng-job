app.controller('annoncesCtrl', function($scope, $location, lsSvc){
	$scope.titre = "Mes Annonces";
	$scope.annonces = lsSvc.listeAnnonces();
	
	/* si aucune annonce enregistrée, redirection vers la recherche */
	if($scope.annonces.length == 0)
	{
		$location.path('/'); //redirection vers la recherche
	}

	//supprimer une annonce en fonction de son index dans le LS
	$scope.supprimer = function(id)
	{
		console.log(id);
		lsSvc.suppAnnonce(id);
		//mise à jour de l'affichage
		$scope.annonces = lsSvc.listeAnnonces();
	}
});