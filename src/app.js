import "bootstrap/dist/css/bootstrap.css";
import angular from "angular";
import { words } from "./words";

(function() {
  const app = angular.module("HangmanApp", []);
  app.controller("GameController", [
    "$scope",
    function($scope) {
      let imgNo = 1;
      $scope.hiddenPassword = "";

      $scope.startGame = function() {
        $scope.password = words[
          Math.floor(Math.random() * words.length)
        ].toUpperCase();
        const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
        $scope.alphabet = Array.prototype.map.call(alphabet, letter => {
          return { name: letter, selected: false, status: null };
        });
        $scope.img = "img/hangman1.jpg";
        $scope.attempt = 6;
        $scope.right = 0;
        $scope.miss = 0;
        $scope.win = false;
        $scope.loose = false;
        let tempPass = "";
        for (var i = 0; i < $scope.password.length; i++) {
          tempPass += "-";
        }
        $scope.hiddenPassword = tempPass;
      };

      $scope.check = letter => {
        letter.selected = true;
        for (var i = 0; i < $scope.password.length; i++) {
          if (letter.name === $scope.password[i]) {
            if (i > 0) {
              $scope.hiddenPassword = [
                $scope.hiddenPassword.slice(0, i),
                letter.name,
                $scope.hiddenPassword.slice(i + 1)
              ].join("");
            } else {
              $scope.hiddenPassword = [
                letter.name,
                $scope.hiddenPassword.slice(i + 1)
              ].join("");
            }
            $scope.right += 1;
            letter.status = "ok";
            if ($scope.right === $scope.password.length) {
              $scope.win = true;
            }
          }
        }

        if ($scope.password.search(letter.name) === -1) {
          $scope.attempt -= 1;
          $scope.miss += 1;
          imgNo += 1;
          $scope.img = "img/hangman" + imgNo + ".jpg";
          letter.status = "wrong";
          if ($scope.miss === 6) {
            $scope.loose = true;
          }
        }
      };

      $scope.grammar = () => ($scope.miss === 1 ? "time" : "times");

      $scope.startGame();
    }
  ]);
})();
