cd ios 

# chmodding libsodium's pods directory to be able to apply patches to it
if [ -d "Pods/libsodium" ]; then
    chmod -R 744 Pods/libsodium
    echo "Changed directory permissions of libsodium to 744 to enable patching"
fi

echo "Running pod install"
# find more information about the patches applied in the Podfile itself (ios/Podfile)
pod install

cd ..