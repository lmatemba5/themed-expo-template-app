package com.iera.apps.services

import android.app.Activity
import android.graphics.Color
import android.os.Build
import android.view.View
import android.view.WindowInsetsController
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class NativeTheme(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "NativeTheme"
    }

    @ReactMethod
    fun setDarkTheme(promise: Promise) {
        currentActivity?.let { activity ->
            val window = activity.window
            val decorView = window.decorView

            window.navigationBarColor = Color.parseColor("#111827")

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                decorView.windowInsetsController?.setSystemBarsAppearance(
                    0,
                    WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS
                )
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                decorView.systemUiVisibility = (
                    decorView.systemUiVisibility and View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR.inv()
                )
            }

            promise.resolve(true)
        } ?: run {
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun setLightTheme(promise: Promise) {
        currentActivity?.let { activity ->
            val window = activity.window
            val decorView = window.decorView

            window.navigationBarColor = Color.parseColor("#F9FAFB")

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                decorView.windowInsetsController?.setSystemBarsAppearance(
                    WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS,
                    WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS
                )
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                var flags = decorView.systemUiVisibility
                flags = flags or View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
                decorView.systemUiVisibility = flags
            }

            promise.resolve(true)
        } ?: run {
            promise.resolve(false)
        }
    }
}