'use strict';

/* Controllers */

function ContestListCtrl($scope, $timeout, $http, $routeParams, Contests) {
    // Set up sports
    $scope.sports = {1 : "Quidditch" , 2 : "Baseball", 3 : "Basketball"};
    
    $scope.contests = Contests.getContests();
    $scope.orderProp = 'contestId';
    $scope.contestId = $routeParams.contestId || 0;
    if ($scope.contestId > 0) {    
         $scope.contest = Contests.getContest($scope.contestId);
    }
    
    $scope.onTimeout = function(){ 
        Contests.update(function(points){
            console.log("in callback: " + points);
            var len = $scope.contests.length;
            for (var i=0; i<len; i++) {
                var contest = $scope.contests[i];
                if (points[contest.contestId]) {
                    contest.points = points[contest.contestId].pts;            
                }
        
                //$scope.contestId = $scope.contestId == contest.contestId ? contestId;
                //var foo = Points.getPoints(contest.contestId);
            }
        });
    };
    var timeout = $timeout($scope.onTimeout, 5000); 
  
    $scope.deleteContest = function(contest) {
        console.log('deleting contest: ' + contest.name);
        var index = $scope.contests.indexOf(contest);
        $scope.contests.splice(index,1);           
    }

    $scope.stop = function(){
        $timeout.cancel(mytimeout);
    }
}

function FormCtrl($scope, Contests) { 
    
    $scope.add = function(cform) {
      $scope.contests.push({
          contestId : Contests.getNextContestId(),
          name : cform.name,
          sportId : cform.sportId,
          points : cform.points,
          startDate: "2013-02-01",
          avatarSrc: "https://secure.gravatar.com/avatar/8840bdc83689409daeeb2348f47db8ef?d=https%3A%2F%2Fd3oaxc4q5k2d6q.cloudfront.net%2Fm%2F388783eb49d4%2Fimg%2Fdefault_avatar%2F32%2Fuser_blue.png&s=32"
          
      });
  };

  $scope.reset = function() {
    $scope.cform = {
        name: 'New Contest',
        points: 175,
        sportId: 2
    };
  };

  $scope.reset();
}

/*
function ContestDetailCtrl($scope, $routeParams) {
    // angular.forEach($scope.contests, function(contest, key) {
    //     if (contest.id == $routeParams.contestId) {
    //         $scope.contest = contest;
    //     }
    // });    
      // $scope.contest = Contest.get({contestId: $routeParams.contestId}, function(contest) {
  // });
}
*/