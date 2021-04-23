/* injection des services dans le contrôleur. $sce permet de sécuriser 
	 du contenu dynamique type HTML ou code*/
app.controller('homeCtrl', function($scope, $location, $sce, lsSvc, jobSvc){
	$scope.titre = "Recherche";
	$scope.type = 1;
	/* tableau pour la création du select des rayons */
	$scope.rayons = [
		{id: 0, txt: '< 0 km'}, 
		{id:8, txt: '< 8 km'},
		{id: 16, txt: '< 16 km'},
		{id: 24, txt: '< 24 km'},
		{id: 40, txt: '< 40 km'},
		{id: 80, txt: '< 80 km'}
	];
	$scope.objSearch = {};
	$scope.annonces = false;
	$scope.config = {};
	
	/* Au démarrage, récupération de la config dans le LS pour remplir le formulaire */
	if(lsSvc.existConfig()){
		$scope.config = lsSvc.lireConfig();
		$scope.recherche = $scope.config.keywords;
		$scope.ville = $scope.config.location;
		$scope.salaire = $scope.config.salary;
		$scope.rayon = $scope.config.radius;
		$scope.type = $scope.config.searchMode;
		$scope.page = $scope.config.page;
	};

	/* enregistrement d'une annonce depuis un clic sur le bouton associé */
	$scope.sauver = function(annonce) {
		console.log(annonce);
		lsSvc.ajoutAnnonce(annonce);
	}
	/* remise à 0 du formulaire et effacement de la config dans le LS */
	$scope.resetForm = function() {
		$scope.objSearch = {};
		$scope.annonces = false;
		$scope.page = 1;
		$scope.type = 1;
		//effacer la config
		lsSvc.effConfig();
	};

	/* fonctions de navigation en fonction de la page demandée */ 
	$scope.first = function(){
		$scope.objSearch.page = 1;
		$scope.page = 1;
		jobSvc.recherche($scope.objSearch)
		.then(function(retour) {
			miseEnForme(retour);
		})
		.catch(function(err){
			console.log(err);
		});
	};
	$scope.prev = function(){
		$scope.page ? $scope.page-- : $scope.page = 1;
		if($scope.page > 1) 
		{
			$scope.objSearch.page = $scope.page;
			jobSvc.recherche($scope.objSearch)
			.then(function(retour) {
				miseEnForme(retour);
			})
			.catch(function(err){
				console.log(err);
			});
		}
	};
	$scope.next = function(){
		$scope.page ? $scope.page++ : $scope.page = 2;
		if($scope.end <= $scope.nbAnnonces && $scope.page <= 56) 
		{
			$scope.objSearch.page = $scope.page;
			console.log($scope.objSearch);
			jobSvc.recherche($scope.objSearch)
			.then(function(retour) {
				miseEnForme(retour);
			})
			.catch(function(err){
				console.log(err);
			});
		}
	};
	$scope.last = function(){
		$scope.page = Math.floor($scope.nbAnnonces / 20);
		if($scope.page > 56) $scope.page = 56;
		$scope.objSearch.page = $scope.page;
		jobSvc.recherche($scope.objSearch)
		.then(function(retour) {
			miseEnForme(retour);
		})
		.catch(function(err){
			console.log(err);
		});
	};
	// soumission du formulaire.
	$scope.validForm = function() {
		//création de l'objet pour le service
		$scope.objSearch = {}; //nouvel objet en cas de suppression d'une info dans le formulaire
		$scope.objSearch.keywords = $scope.recherche; // obligatoire 
		$scope.objSearch.searchMode = $scope.type; // obligatoire
		if($scope.ville) $scope.objSearch.location = $scope.ville;
		if($scope.rayon) $scope.objSearch.radius = $scope.rayon;
		if($scope.salaire) $scope.objSearch.salary = $scope.salaire;
		if($scope.page) $scope.objSearch.page = $scope.page;
		//appel du service pour récupérer les offres
		jobSvc.recherche($scope.objSearch)
		.then(function(retour) {
			//console.log(retour);
			miseEnForme(retour);
		})
		.catch(function(err){
			console.log(err);
		});
	}
	/* mise en forme du résultat et de la pagination */
 	let miseEnForme = function(a)
	{
		// sécurisation du contenu HTML avec le service $sce
		// qui permet de ne pas avoir de message d'erreur quand on affiche du HTML avec 
		// la directive ng-bind-html (en remplacement des {{ }}) 
		lsSvc.ecrireConfig($scope.objSearch);
		a.jobs.forEach(function(j) {
			j.snippet = $sce.trustAsHtml(j.snippet);
		});
		// création/mise à jour des variables à afficher sur la page.
		$scope.annonces = a.jobs;
		$scope.nbAnnonces = a.totalCount;
		// création/mise à jour des variables pour la gestion des boutons de navigation
		if($scope.page)
		{
			$scope.start = (($scope.page - 1) * 20) + 1;
			$scope.end = $scope.page * 20;
		}
		else 
		{
			$scope.start = 1;
			$scope.nbAnnonces <= 20 ? $scope.end = $scope.nbAnnonces : $scope.end = 20;
		}
	}
});