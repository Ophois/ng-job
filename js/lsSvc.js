app.service('lsSvc', function(){

	this.config = {};
	this.limite = 20; //nombre maxi d'annonces à enregistrer

	/* lecture de la configuration dans le localStorage */
	this.lireConfig = function(){
		let config = localStorage.getItem('config');
		return JSON.parse(config);
	};
	/* écriture de la config dans le localStorage */
	this.ecrireConfig = function(cfg)
	{
		localStorage.setItem('config', JSON.stringify(cfg));
	};
	/* suppression de la config dans le localstorage */
	this.effConfig = function(){
		localStorage.removeItem('config');
	};
	/* vérification si config enregistrée dans le localStorage */
	this.existConfig = function(){
		if(localStorage.getItem('config')) return true;
		else return false;
	}

	/* Ajout d'une annonce dans le localStorage */
	this.ajoutAnnonce = function(annonce){
		//récupération des annonces enregistrées
		let liste = this.listeAnnonces();
		// si moins de 20 annonces enregistrées
		if(liste.length < this.limite) {
			//si première annonce à enregistrer
			if(liste.length == 0) liste.push(annonce);
			//si d'autres annonces sont présentes
			else {
				//vérifier si annonce pas déjà présente... sinon ajout dans la liste
				if(liste.find(element => element.id == annonce.id)) alert('Annonce déjà enregistrée ;-)');
				else liste.push(annonce);	
			}
			//sauvegarde de la liste dans le localStorage
			localStorage.setItem('annonces', JSON.stringify(liste));
		}
		//si trop d'annonces, message d'alerte
		if(liste.length == this.limite) {
			 window.alert('vous avez atteint votre capacité maxi...');
		}
	};
	/* supprimer une annonce en fonction de son index */
	this.suppAnnonce = function(id){
		let liste = this.listeAnnonces();
		liste.splice(id, 1);
		localStorage.setItem('annonces', JSON.stringify(liste));
	};
	/* récupération de la liste des annonces enregistrées */
	this.listeAnnonces = function()
	{
		if(localStorage.getItem('annonces'))
		{
			liste = JSON.parse(localStorage.getItem('annonces'));
		}
		//si la liste n'existe pas, retour d'un tableau vide pour éviter les erreurs
		else liste = [];
		return liste;
	};
});