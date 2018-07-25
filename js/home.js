angular.module('minefield')
    .controller('homeCtrl', function ($scope) {
        (function createMinefield() {
            $scope.minefield = {};
            $scope.minefield.rows = [];

            for (var i = 0; i < 9; i++) {
                var row = {};
                row.spots = [];

                for (var j = 0; j < 9; j++) {
                    var spot = {};
                    spot.isCovered = true;
                    spot.content = "empty";
                    row.spots.push(spot);
                }
                $scope.minefield.rows.push(row);
            }
            addMineBox($scope.minefield);
            calculateAllNearByNumber($scope.minefield);
            // console.log($scope.minefield);
        })();

        function addMineBox(arr) {
            for (var i = 0; i < 10; i++) {
                placeRandomMine(arr);
            }
        }

        function placeRandomMine(arr) {
            var row = Math.round(Math.random() * 8);
            var column = Math.round(Math.random() * 8);
            var spot = getSpot(arr, row, column);
            spot.content = 'bomb';
        }

        function getSpot(minefield, row, column) {
            return minefield.rows[row].spots[column];
        }

        function calculateAllNearByNumber(arr) {
            for (var column = 0; column < 9; column++) {
                for (var row = 0; row < 9; row++) {
                    calculateNumber(arr, row, column);
                }
            }
        }

        function calculateNumber(arr, row, column) {
            var clickSpot = getSpot(arr, row, column);

            if (clickSpot.content == 'bomb') return;

            var mineCount = 0;
            // check row above if this is not the first row
            if (row > 0) {
                // check column to the left if this is not the first column
                if (column > 0) {
                    // get the spot above and to the left
                    var spot = getSpot(arr, row - 1, column - 1);
                    if (spot.content == "bomb") {
                        mineCount++;
                    }
                }

                // get the spot right above
                var spot = getSpot(arr, row - 1, column);
                if (spot.content == "bomb") {
                    mineCount++;
                }

                // check column to the right if this is not the last column
                if (column < 8) {
                    // get the spot above and to the right
                    var spot = getSpot(arr, row - 1, column + 1);
                    if (spot.content == "bomb") {
                        mineCount++;
                    }
                }
            }

            // check column to the left if this is not the first column
            if (column > 0) {
                // get the spot to the left
                var spot = getSpot(arr, row, column - 1);
                if (spot.content == "bomb") {
                    mineCount++;
                }
            }

            // check column to the right if this is not the last column
            if (column < 8) {
                // get the spot to the right
                var spot = getSpot(arr, row, column + 1);
                if (spot.content == "bomb") {
                    mineCount++;
                }
            }

            // check row below if this is not the last row
            if (row < 8) {
                // check column to the left if this is not the first column
                if (column > 0) {
                    // get the spot below and to the left
                    var spot = getSpot(arr, row + 1, column - 1);
                    if (spot.content == "bomb") {
                        mineCount++;
                    }
                }

                // get the spot right below
                var spot = getSpot(arr, row + 1, column);
                if (spot.content == "bomb") {
                    mineCount++;
                }

                // check column to the right if this is not the last column
                if (column < 8) {
                    // get the spot below and to the right
                    var spot = getSpot(arr, row + 1, column + 1);
                    if (spot.content == "bomb") {
                        mineCount++;
                    }
                }
            }
            if (mineCount > 0) {
                clickSpot.content = mineCount;
            }
        }

        function hasWon(arr) {
            for (var row = 0; row < 9; row++) {
                for (var column = 0; column < 9; column++) {
                    var spot = getSpot(arr, row, column);
                    if (spot.content != 'bomb' && spot.isCovered) {
                        return false;
                    }
                }
            }
            return true;
        }
        $scope.uncoverSpot = function (spot) {
            spot.isCovered = false;
            if (spot.content == 'bomb') {
                $scope.showLostMessage = true;
            }
            else {
                if (hasWon($scope.minefield)) {
                    $scope.showWinMessage = true;
                }
            }
        }

    })