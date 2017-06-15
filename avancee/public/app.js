'use strict';

class Home {
    constructor($http, $scope) {
        this.datas = []
        this.http = $http
        this.scope = $scope
        this.fetchDatas()
    }

    async fetchDatas() {
        this.datas = await this.http.get('/mocks/data.json').catch(this.fail)
        this.datas = this.datas.data.data

        /// ---- 

        // après quelques recherches,
        // logique que async/await ne fonctionnent pas encore comme "ça" dans un contexte angular

        this.scope.$apply() // merci de vous renseigner -> c'est important ça

        /// ---- 

    }

    fail(err) {
        console.error(err)
    }
}

const home = {
    templateUrl: '/home/home.html',
    controller: Home
}

angular.module('myApp', [])
    .component('home', home)
