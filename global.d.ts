import "react-native"

declare module "react-native"{
    interface NativeModulesStatic{
        NativeTheme:{
            setDarkTheme: ()=> Promise<boolean>,
            setLightTheme: ()=> Promise<boolean>
        }
    }
}