package com.ownyourdata;

import com.facebook.react.ReactActivity;

// custom imports

import com.reactnativenavigation.NavigationActivity;

// necessary for react-native-orientation implementation
import android.content.Intent;
import android.content.res.Configuration;

public class MainActivity extends NavigationActivity {

  // this method is necessary for react-native-orientation to work
  // https://www.npmjs.com/package/react-native-orientation
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  }
}
