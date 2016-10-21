(function() {
    'use strict';
    angular
        .module('blogApp')
        .factory('Tag', Tag);

    Tag.$inject = ['$resource', 'DateUtils'];

    function Tag ($resource, DateUtils) {
        var resourceUrl =  'api/tags/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.date = DateUtils.convertDateTimeFromServer(data.date);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
