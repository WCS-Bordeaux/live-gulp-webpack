'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Home = function () {
    function Home($http, $scope) {
        _classCallCheck(this, Home);

        this.datas = [];
        this.http = $http;
        this.scope = $scope;
        this.fetchDatas();
    }

    _createClass(Home, [{
        key: 'fetchDatas',
        value: async function fetchDatas() {
            this.datas = await this.http.get('/mocks/data.json').catch(this.fail);
            this.datas = this.datas.data.data;

            /// ---- 

            // après quelques recherches,
            // logique que async/await ne fonctionnent pas encore comme "ça" dans un contexte angular

            this.scope.$apply // merci de vous renseigner -> c'est important ça

            /// ---- 

            ();
        }
    }, {
        key: 'fail',
        value: function fail(err) {
            console.error(err);
        }
    }]);

    return Home;
}();

var home = {
    templateUrl: '/home/home.html',
    controller: Home
};

angular.module('myApp', []).component('home', home);
//# sourceMappingURL=app.js.map
