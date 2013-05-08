'use strict';

/* Services */

var contestModule = angular.module('contestServices', ['ngResource']);

contestModule.factory('Rest', function($resource){    
    return $resource('/app/contests/:contestId.json', {}, {
        query: {method:'GET', params:{contestId:'contests'}, isArray:true}
    });
});

contestModule.factory('Contests', function($http, Rest){
    var nextContestId = 546;
    var contests;

    return {
        
        update: function(callback) {
            $http.get('/api/points').success(function(data){
                callback(data);
            });
        },
        
        getContests: function() {
            if (!contests) {
                contests = Rest.query();
            }
            return contests;
        },
        
        getContest: function(contestId) {
            var len = contests.length;
            
            for (var i=0; i<len; i++) {
                if (contests[i].contestId == contestId) {
                    return contests[i];
                }
            }
        },
        
        getNextContestId: function() {
            console.log('next contestId: ' + nextContestId);
            return ++nextContestId;
        }
    };
});
