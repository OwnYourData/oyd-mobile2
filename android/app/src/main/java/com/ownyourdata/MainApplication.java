package com.ownyourdata;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;

import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;

import com.facebook.soloader.SoLoader;
import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.controllers.ActivityCallbacks;
import com.crashlytics.android.Crashlytics;

import io.fabric.sdk.android.Fabric;


import java.util.List;

public class MainApplication extends NavigationApplication implements ReactApplication {

    @Override
    public void onCreate() {
        super.onCreate();

        setActivityCallbacks(new ActivityCallbacks() {
            @Override
            public void onConfigurationChanged(Configuration newConfig) {
                super.onConfigurationChanged(newConfig);
                Intent intent = new Intent("onConfigurationChanged");
                intent.putExtra("newConfig", newConfig);
                sendBroadcast(intent);
            }
        });

        SoLoader.init(this, false);
        Fabric.with(this, new Crashlytics());
    }

    protected List<ReactPackage> getPackages() {
        @SuppressWarnings("UnnecessaryLocalVariable")
        List<ReactPackage> packages = new PackageList(this).getPackages();
        // Packages that cannot be autolinked yet can be added manually here, for example:
        // packages.add(new MyReactNativePackage());
        return packages;
        
        // return Arrays.<ReactPackage>asList(
        //         new RNGeocoderPackage(),
        //         new FusedLocationPackage(),
        //         new RCTCameraPackage(),
        //         new ReactNativeRestartPackage(),
        //         new ReactNativeExceptionHandlerPackage(),
        //         new SvgPackage(),
        //         new RNSpinkitPackage(),
        //         new VectorIconsPackage(),
        //         new RNFetchBlobPackage(),
        //         new RNBackgroundFetchPackage(),
        //         new RNI18nPackage(),
        //         new SodiumPackage(),
        //         new Sha256Package(),
        //         new WifiCheckPackage(),
        //         new OrientationPackage(),
        //         new RNAndroidLocationEnablerPackage()
        // );
    }

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }

    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

    @Override
    public boolean clearHostOnActivityDestroy() {
        return false;
    }
}
