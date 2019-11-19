## Example project for dense-action-creators 

Small demo project intended to show how to use TypeScript to enhance handling of actions type/action creators in this case using [dense-redux-actions](https://www.npmjs.com/package/dense-redux-actions)

### Short description

The app uses [react-native-geolocation-service](https://www.npmjs.com/package/react-native-geolocation-service) in order to utilize externally defined types from a somewhat real life scenario.  

### Want to try it out?
Clone the repository and start exploring. To see it in action try;  

* grabbing an action type from an action in your debugger and search for it in the code.
* open a saga and inspect the types of unpacked payload. 
* at a new feature to the speedometer - pull requests are welcome/

### How to run 
Start a virtual Android device and do the usual installation dance:

    git clone git@github.com:pcodk/dense-redux-actions.git
    
    cd ./dense-redux-actions/examples/ColorSpeed
    yarn
    npx react-native run-android

    
### More info

Take a look at the companion [blog post]() describing a simple solution for better redux actions/action creators with TypeScript. 

### License 
"This project is licensed under the terms of the MIT license." See LICENCE.