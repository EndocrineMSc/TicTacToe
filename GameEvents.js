//events (publish subscribe) pattern
const gameEvents = {
    events: {},
    subscribe: function (eventName, fn) {
      this.events[eventName] = this.events[eventName] || [];
      this.events[eventName].push(fn);
    },
    remove: function(eventName, fn) {
      if (this.events[eventName]) {
        for (var i = 0; i < this.events[eventName].length; i++) {
          if (this.events[eventName][i] === fn) {
            this.events[eventName].splice(i, 1);
            break;
          }
        };
      }
    },
    invoke: function (eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(function(fn) {
          fn(data);
        });
      }
    }
};

//event names
const PLAYER_ACTION_EVENT = "onPlayerAction";
const MARK_PLACED_EVENT = "onMarkPlaced";
const GAME_WON_EVENT = "onGameWon";
const DRAW_EVENT = "onGameDraw";