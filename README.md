# Add Life To Your Life
##Purpose
___
Ever wanted to decorate your home with living art the same way you do with paintings or sculptures. Having trouble getting started? Have you tried and just ended up killing them? Enter LivenUp. Start with the space you want to add life to and choose from images curated to inspire creativity and we will provide you with a list of plants that will get you started. Brown thumb to green thumb this app can drive that desire and turn it into a manageable reality.

##Database Setup
___
* Edit index.js
  * change ``` mongoose.connect('mongodb://<USERNAME>:<PASSWORD>@<SERVER>'); ```

##Installation Instructions
___
* Fork from the master branch of [LivenUp](https://github.com/livenUp/livenUp)
* run ```npm install```
* run ```webpack```

##Run Server
___
run ``` node /server/index.js ```
Navigate to localhost:3000 and you will see your server running.

##Directory Structure and Purpose
___
+ assets - ??
+ client -  The Client facing app
  - actions
    + auth_actions.js
      - signupUser(email, password)
      - loginUser(email, password)
      - logoutUser()
    + blouhmdata_actions.js
      - fetchBlouhmData = ()
    + creator_actions.js
      - createSpace(newSpace)
      - updateUserSpace(updatedSpace)
    + index.js
      - selectSpace(spaceName)
    + inspiration_actions.js
      - fetchInspirations(room)
      - selectInspiration(selectedInspiration)
    + spaces_actions.js
      - fetchUserSpaces()
  - assets - stores local static assets
    - images
      - Originals
    - flowers.mp4
  - components
    - app.js
    - footer.js
    - index.js
    - jumbotron.js
    - logInOut.js
    - myspaces.js
    - navbar.js
    - plant.js
  - containers
    - inspirations.js
    - login.js
    - mygreenspaces.js
    - signup.js
    - space.js
    - spaceCreator.js
    - spaceList.js
  - reducers
    - index.js
    - reducer_auth.js
    - reducer_creator.js
    - reducer_inspirations.js
    - reducer_listOfSpaces.js
    - reducer_selectedInspiration.js
    - reducer_selectSpace.js
    - reducer_userSpaces.js
  - style
    - semantic.css
    - style.css
  - index.html
  - index.js
  - routes.js
+ database
  - inspirations.js
  - plants.js
  - spaces.js
  - users.js
+ server
  - routes
    - inspirations.js
    - plants.js
    - routes.js
    - spaces.js
    - users.js
  - utilities_scraper
    - oauth
      - oauth.js
      - oauthTest.html
      - oauthTest.js
      - README.txt
      - sha1.js
    - inspiration_plants_example.json
    - mongoImportPlants.sh
    - myGarden.html
    - mygarden.js
    - plants.csv
    - plants.json
  - auth.js
  - helpers.js
  - index.js
  - sockets.js
  - utilities.js
- test
  - test.js
- .babelrc
- .gitignore
- .jshintrc
- .nvmrc
- bundle.js
- LICENSE
- package.json
- Procfile
- README.md
- webpack-production.config.js
- webpack.config.js
