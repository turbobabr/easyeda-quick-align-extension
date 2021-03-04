const https = require('http')

const DEFAULT_PORT = 9999;

function installExtension(extensionBuildPath, port) {
  port = port || DEFAULT_PORT;

  const data = JSON.stringify({
    path: extensionBuildPath
  });
  
  const options = {
    hostname: 'localhost',
    port: 9999,
    path: '/install-extension',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    },    
  }
  
  const req = https.request(options, res => {
    res.on('data', d => {      
      console.log('[easyeda-dev-server]: Installation request has been sent!')
    })
  })
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.write(data)
  req.end()
}

module.exports = {
  installExtension: installExtension
};
