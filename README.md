# <img src="https://raw.githubusercontent.com/OwnYourData/oyd-mobile2/master/res/app-icon.png" width="64"> OwnYourData Mobile App

The official Android and iOS app for the [OwnYourData](https://www.ownyourdata.eu/) [Data-Vault](https://data-vault.eu/). Access your data on the go.

<p align="center">
  <img alt="App screenshot, showing overview of data vault" title="App screenshot" src="https://raw.githubusercontent.com/OwnYourData/oyd-mobile2/master/res/app-screenshot-1.png" width="300" />

  <br>

  <a href="https://apps.apple.com/at/app/ownyourdata/id1176891221">
    <img alt="Download on the App Store" title="App Store" src="https://raw.githubusercontent.com/OwnYourData/oyd-mobile2/master/res/apple-app-store-badge.png" width="140">
  </a>

  <a href="https://play.google.com/store/apps/details?id=com.ownyourdata">
    <img alt="Get it on Google Play" title="Google Play" src="https://raw.githubusercontent.com/OwnYourData/oyd-mobile2/master/res/google-play-store-badge.png" width="140">
  </a>
</p>

## Features

A few of the things you can do with the OwnYourData app:

* Connect to your private data vault or use one provided by OwnYourData.
* Access all applications from your data vault.
* Collect and encrypt your location data and send them to your data vault.

## Installation & Development

App was built with **react-native** under the hood.

### Prerequisites (both Android & iOS)

* node.js (version >= 12)
* yarn package manager

### Android

* Android SDK installed

```shell
yarn install
yarn run start # starts metro bundler for bundling js resources
yarn run android # builds and installs the app on your connected phone/simulator
```

Before building a production build, a development build has to be built.

```shell
yarn build-android
```

### iOS

* XCode must be installed on your system

#### Development Build

```shell
yarn install # installs node dependencies
yarn run init-ios # installs pods and applies patches
yarn run start # starts metro bundler for bundling js resources
```

* Open the iOS project (`ios` folder within the project)
* Ensure that schema "ownyourdata-debug" is selected in XCode
* Hit the button "run"

#### Production Build

```shell
yarn install # installs node dependencies
yarn run init-ios # installs pods and applies patches
````
* Open the iOS project (`ios` folder within the project)
* Ensure that schema "ownyourdata-release" is selected in XCode
* Then refer to this guide -> https://reactnative.dev/docs/publishing-to-app-store

---

**Note regarding patches:** More information on the patches is provided in the file `scripts/init-ios.sh`