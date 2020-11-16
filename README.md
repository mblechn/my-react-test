* my-react-test
* npx create-react-app my-react-test
* cd my-react-test
* npm install react-bootstrap bootstrap
* npm install --save react-router-dom
* npm install --save @fortawesome/fontawesome-free
* npm install --save joi-browser
* npm install --save jwt-decode
* npm install --save axios
* npm install --save react-toastify
* npm install --save jwt-decode
* npm start


## 
* open folders side-by-side in finder
  * ~/⁨Downloads⁩/Section 10- Deployment⁩/start⁩/⁨vidly⁩
  * ~/my-react-test
* open folders in vs code in side-by-side Mac desktops
  * ~/⁨Downloads⁩/Section 10- Deployment⁩/start⁩/⁨vidly⁩
  * ~/my-react-test
* Setup elasticsearch and mongo
  * in terminal ...
    * cd MedEdSearch
    * vagrant up
    * vagrant ssh
  * in vagrant
    * cd /vagrant
    * ./dockerpurge.sh
    * docker-compose up -d elasticsearch
    * elasticsearch-config-files/es-config-setup.sh
    * docker-compose up -d mongodb
    * sudo cp testing-related/mes-test-documents/*.pdf /var/lib/docker/volumes/vagrant_mes_docs/_data
    * docker exec -it elasticsearch /usr/share/fscrawler/bin/fscrawler mes_docs --loop 1
    * testing-related/query.sh 'acd'
* run api server
  * cd mes-api-container-build-files
  * export mes_jwtPrivateKey=12345
  * node index.js
* start my-react-test
  * in terminal
    * cd ~/my-react-test
    * npm start

