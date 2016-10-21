(function() {
    'use strict';
    angular
        .module('blogApp')
        .factory('Blog', Blog);

    Blog.$inject = ['$resource', 'DateUtils'];

    function Blog ($resource, DateUtils) {
        var resourceUrl =  'api/blogs/:id';

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
