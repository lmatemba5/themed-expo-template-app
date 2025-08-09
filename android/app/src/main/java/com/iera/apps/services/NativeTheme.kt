package com.iera.apps.services

import android.app.Activity
import android.graphics.Color
import android.os.Build
import android.view.View
import android.view.WindowManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class NativeTheme(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "NativeTheme"

    private fun setColor(colorHex: String, promise: Promise) {
        val activity: Activity? = currentActivity
        if (activity == null) {
            promise.reject("ReactNative", "Activity is NULL")
            return
        }

        activity.runOnUiThread {
            try {
                val window = activity.window
                if (window == null) {
                    promise.reject("ReactNative", "activity.window is NULL")
                    return@runOnUiThread
                }

                window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION)
                window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)

                window.navigationBarColor = Color.parseColor(colorHex)

                promise.resolve(true)
            } catch (e: Exception) {
                promise.reject("ReactNative", e.message ?: "Unknown error")
            }
        }
    }

    @ReactMethod
    fun setLightNavBar(promise: Promise) {
        setColor("#F9FAFB", promise)
    }

    @ReactMethod
    fun setDarkNavBar(promise: Promise) {
        setColor("#111827", promise)
    }
}