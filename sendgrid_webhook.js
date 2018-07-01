var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'namruleall' }, function(err, tunnel) {
  console.log('LT running');
  //console.log(tunnel);
});
