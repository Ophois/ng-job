app.service('jobSvc', function($http){
	this.apikey = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
	this.url = 'https://fr.jooble.org/api/';
	
	//recherche d'annonces avec la méthode POST
	this.recherche = function(obj) {
		return $http({
			method: 'POST',
			url: this.url+this.apikey,
			data: obj})
		.then(function(retour) {
			console.log(retour);
			return retour.data;
		})
		.catch(function(err){
			console.log(err);
		});
	}
});
