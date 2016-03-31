package com.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.tsb.tsb;

public class AppToAppPlugin extends CordovaPlugin {
	private static final String TAG = "AppToAppPlugin";
	private static final String START = "START";

	@Override
	public boolean execute(String action, JSONArray arguments,
			final CallbackContext callbackContext) throws JSONException {

		if (START.equals(action)) {
			String appId = arguments.getString(0);
			String confirmMsg = arguments.getString(1);
			final String caller = arguments.getString(2);
			final String packageName = arguments.getString(3);
			final String className = arguments.getString(4);
			final String downloadUrl = arguments.getString(5);

			Log.d(TAG, "appName: " + appId);

			AlertDialog.Builder dlg = new AlertDialog.Builder(tsb.thisActivity);
			dlg.setTitle("切換確認");
			dlg.setMessage(confirmMsg);

			dlg.setCancelable(false);
			dlg.setNegativeButton("取消", new DialogInterface.OnClickListener() {
				public void onClick(DialogInterface dialog, int which) {
					// do nothing else if needed
				}
			});

			dlg.setPositiveButton("確定", new DialogInterface.OnClickListener() {
				public void onClick(DialogInterface dialog, int whichButton) {
					try {
						Intent intent = new Intent("android.intent.action.MAIN");
						intent.setClassName(packageName, className);
						intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK
								| Intent.FLAG_ACTIVITY_BROUGHT_TO_FRONT);
						intent.putExtra("APSOURCE", caller);
						tsb.thisActivity.startActivity(intent);
						callbackContext.success();
					} catch (Exception e) {
						Log.d(TAG, "The App not install.........");
						try {
							Uri uri = Uri.parse(downloadUrl);
							Intent intent = new Intent(Intent.ACTION_VIEW, uri);
							tsb.thisActivity.startActivity(intent);
						} catch (Exception ex) {
							ex.printStackTrace();
							Log.e(TAG, "AppToAppPlugin action = START, ERROR!");
							callbackContext.error(ex.getMessage());
						}
					}
				}
			});

			dlg.show();
			return true;
		} else {
			callbackContext.error("Action command Error");
			return false;
		}
	}
}
