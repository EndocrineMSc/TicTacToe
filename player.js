const Player = function(name, marker) {
    this.name = name;
    this.marker = marker;
}

Player.prototype.action = function(marker, indeces) {
    gameEvents.invoke(PLAYER_ACTION_EVENT, {marker, indeces});
}