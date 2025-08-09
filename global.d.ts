import "react-native";

declare module "react-native"{
    interface NativeModulesStatic{
        NativeTheme:{
            setLightNavBar: () => Promise<boolean>,
            setDarkNavBar: () => Promise<boolean>
        }
    }
}