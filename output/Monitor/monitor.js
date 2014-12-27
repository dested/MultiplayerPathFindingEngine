var app = angular.module('MMOMonitor', ['ui.bootstrap']);

app.controller('Main', function ($scope) {

    var socket = io.connect('127.0.0.1:9992');
    $scope.model = {};
    $scope.model.selectedLogPiece = null;
    $scope.model.tabs = [];

    var longWait = 5 * 1000;

    setInterval(function () {

        for (var k = 0; k < $scope.model.tabs.length; k++) {
            var tab = $scope.model.tabs[k];

            for (var l = 0; l < tab.servers.length; l++) {
                var server = tab.servers[l];
                if (((new Date()) - server.lastAlive) > longWait) {
                    server.online = false;
                }

            }
        }
    }, longWait);
    setInterval(function () {
        $scope.$apply();
    }, 2000);



    for (var i = 0; i < servers.length; i++) {

        (function (serverName) {
            socket.on(serverName, function (data) {
                for (var k = 0; k < $scope.model.tabs.length; k++) {
                    if ($scope.model.tabs[k].title == data.serverType) {
                        var tab = $scope.model.tabs[k];

                        var selectedServer = undefined;
                        for (var l = 0; l < tab.servers.length; l++) {
                            var server = tab.servers[l];
                            if (server.name == data.serverName) {
                                selectedServer = server;
                            }
                        }
                        if (!selectedServer) {
                            var logPieces = [];
                            for (var j = 0; j < logTypes.length; j++) {
                                logPieces.push({ logTitle: logTypes[j], logs: [], currentLogIndex: 0 });
                            }
                            tab.servers.push(selectedServer = { name: data.serverName, logPieces: logPieces });
                        }


                        var logType;
                        switch (data.logLevel) {
                            case "information":
                                logType = 'Information';
                                break;
                            case "debugInformation":
                                logType = 'Debug Information';
                                break;
                            case "error":
                                logType = 'Errors';
                                break;
                            case "transportInfo":
                                logType = 'Transport';
                                break;
                            case "dataInfo":
                                logType = 'Data Transport';
                                break;
                            case "keepAlive":
                                selectedServer.lastAlive = new Date();
                                selectedServer.online = true;
                                return;
                        }


                        for (var m = 0; m < selectedServer.logPieces.length; m++) {
                            var logPiece = selectedServer.logPieces[m];
                            if (logPiece.logTitle === logType) {
                                logPiece.logs.push({ message: data.message, content: data.content, time: data.time });

                                if (logPiece === $scope.model.selectedLogPiece) {
                                    $scope.model.selectedLogPiece.currentLogIndex = logPiece.logs.length;
                                }

                                return;
                            }
                        }

                    }
                }

                alert('BAD' + JSON.stringify(data));
                console.log(data);
            });
        })(servers[i]);



        $scope.model.tabs.push({ title: servers[i], servers: [] })
    }

    $scope.model.isOutOfSync = function (logPiece) {
        if (logPiece.currentLogIndex < logPiece.logs.length) {

            return { backgroundColor: 'yellow' };
        }
        return {};
    };
    $scope.model.isParentOutOfSync = function (tab) {
        var right = 0;
        var left = 0;
        for (var fm = 0; fm < tab.servers.length; fm++) {
            var server = tab.servers[fm];
            for (var i = 0; i < server.logPieces.length; i++) {
                right += server.logPieces[i].logs.length;
                left += server.logPieces[i].currentLogIndex;
            }

        }
        if (left < right) {

            return { backgroundColor: 'yellow' };
        }
        return {};
    };


}).controller('MainSegment', function ($scope) {

    var socket = io.connect('127.0.0.1:9992');
    $scope.model = {};
    $scope.model.selectedLogPiece = null;
    $scope.model.gameSegments = {};

    var longWait = 5 * 1000;
/*


    setInterval(function () {
        $scope.$apply();
    }, 1000);
*/


    socket.on("message", function (data) {
        if (!$scope.model.gameSegments[data.gameSegmentId]) {
            $scope.model.gameSegments[data.gameSegmentId] = {
                users:[]
            };
        }

        var gameSegment = $scope.model.gameSegments[data.gameSegmentId];

        if (data.message.type == 'keepAlive') {
            return;
        }

        switch(data.message.type) {
            case 'userJoined':
                gameSegment.users.push({
                    userId: data.message.userId,
                    x: data.message.x,
                    y: data.message.y,
                    isMine:data.message.isMine
                });
                break;

            case 'userLeft':
                for (var i = 0; i < gameSegment.users.length; i++) {
                    var user = gameSegment.users[i];
                    if (user.userId == data.message.userId) {
                        gameSegment.users.splice(i, 1);
                        break;
                    }
                }
                break;
            case 'tellUserMoved':
                for (var i = 0; i < gameSegment.users.length; i++) {
                    var user = gameSegment.users[i];
                    if (user.userId == data.message.userId) {
                        user.x = data.message.x;
                        user.y = data.message.y;
                        break;
                    }
                }
                break;
            case 'userMoved':
                for (var i = 0; i < gameSegment.users.length; i++) {
                    var user = gameSegment.users[i];
                    if (user.userId == data.message.userId) {
                        user.x = data.message.x;
                        user.y = data.message.y;
                        break;
                    }
                }
                break;
        }

        $scope.$apply();

    });



}).directive('forceScroll', function () {
    return {
        link: function (scope, elem, attr) {
            scope.$watch(attr.forceScroll, function () {
                elem[0].scrollTop = elem.height();
            }, true);
        }
    };
});
