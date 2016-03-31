//
//  AppToAppPlugin.h
//  TSBMobilePOCTsbIphone
//
//  Created by DannyYang on 2016/3/31.
//
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface AppToAppPlugin : CDVPlugin<UIAlertViewDelegate>
@property (nonatomic, strong) NSString *appId;
@property (nonatomic, strong) NSString *confirmMsg;
@property (nonatomic, strong) NSString *caller;
@property (nonatomic, strong) NSString *urlScheme;
@property (nonatomic, strong) NSString *downloadUrl;

- (void) START:(CDVInvokedUrlCommand*)command;

@end
