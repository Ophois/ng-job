//modules + controleurs + routage (injection du module routage)
var app = angular.module('routage', ['ngRoute', 'ngAnimate']);
//configuration des routes
//$routeProvider permet de configurer les différentes routes
app.config(function($routeProvider){
	$routeProvider
	//si '/' dans l'url, appel de home.html + controleur homeCtrl
	.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'homeCtrl'
	})
	.when('/annonces', {
		templateUrl: 'templates/annonces.html',
		controller: 'annoncesCtrl'
	})
	.when('/credits', {
		templateUrl: 'templates/credits.html',
		controller: 'creditsCtrl'
	})
	.when('/mentionslegales', {
		templateUrl: 'templates/ml.html',
		controller: 'mlCtrl'
	})
	//équivalent 404
	.otherwise({
		redirectTo: '/'
	});
});

//filtre pour première lettre en majuscule
app.filter('ucfirst', function(){
	return function(data) {
		return data.charAt(0).toUpperCase() + data.slice(1);
	}
});
//filtre pour transformer une date "2021-04-22T02:34:25.0430000" en jj/mm/aaaa
app.filter('vraiedate', function(){
	return function(data) {
		let dte = new Date(data);
		let jour = dte.getDate();
		/* attention mois numérotés de 0 à 11 */
		let mois = dte.getMonth() + 1;
		/* si jour ou mois < 10 ajout du "0" devant */
		if(jour < 10) jour = '0' + jour;
		if(mois < 10) mois = '0' + mois;
	  return `${jour}/${mois}/${dte.getFullYear()}`;
	}
});

