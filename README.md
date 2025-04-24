# ;)

Please refer to the Wiki for more info.

# How to use the local server

Step 1: Switch to "local-server" branch of the repository

Step 2: Run "npm install" and If needed run "npm install gulp" and "npm install gulp-cli"

Step 3: run "gulp run-server" to initiatite the local server by default it will deploy the local server on 3000 port. But you can specify the port while initiating the server run "gulp run-server --port=3001"

Step 4: Build the experiment you are working on in a separate terminal "gulp --cn=clientName --fn=folderName"

Step 5: Copy the JS code from scriptToAddOnUserJs.js file to User JS and change the experiment ID and the port number. ( scriptToAddOnUserJs.js File is available in experiments folder in "local-server" branch)




1. gulp experiment-create --cn=clientname --fn=experimentname
2. gulp run-server --port=3001
3. gulp --cn=clientName --fn=folderName
4. gulp --cn=clientName --fn=testname --variation=2