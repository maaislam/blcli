/* eslint-disable */
/**
 * Modified from Andy Osmani's book
 */
const PublishSubscribe = {};

((q) => {
  var topics = {}, subUid = -1;
  q.subscribe = function(topic, func) {
      if (!topics[topic]) {
          topics[topic] = [];
      }
      var token = (++subUid).toString();
      topics[topic].push({
          token: token,
          func: func
      });
      return token;
  };

  q.publish = function(topic, args) {
      if (!topics[topic]) {
          return false;
      }
      setTimeout(function() {
          var subscribers = topics[topic],
              len = subscribers ? subscribers.length : 0;

          while (len--) {
              subscribers[len].func(args);
          }
      }, 0);
      return true;

  };

  q.unsubscribe = function(token) {
      for (var m in topics) {
          if (topics[m]) {
              for (var i = 0, j = topics[m].length; i < j; i++) {
                  if (topics[m][i].token === token) {
                      topics[m].splice(i, 1);
                      return token;
                  }
              }
          }
      }
      return false;
  };

})(PublishSubscribe);

export default PublishSubscribe;