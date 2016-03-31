//
//  AppToAppPlugin.m
//  TSBMobilePOCTsbIphone
//
//  Created by DannyYang on 2016/3/31.
//
//

#import "AppToAppPlugin.h"

@implementation AppToAppPlugin

- (void) START:(CDVInvokedUrlCommand*)command
{
    if([command.arguments count] == 5) {
        self.appId = [command.arguments objectAtIndex:0];
        self.confirmMsg = [command.arguments objectAtIndex:1];
        self.caller = [command.arguments objectAtIndex:2];
        self.urlScheme = [command.arguments objectAtIndex:3];
        self.downloadUrl = [command.arguments objectAtIndex:4];
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"提示" message:self.confirmMsg delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"確認前往", nil];
        [alert show];
    } else {
        NSLog(@"呼叫TriggerAppPlugin參數有誤");
    }
}

- (void) alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex{
    switch (buttonIndex) {
        case 0:
            NSLog(@"取消切換App");
            break;
        case 1:
            [self openExternalApp];
            break;
        default:
            break;
    }
}

- (void) openExternalApp {
    NSString *urlSchemeWithParam = [NSString stringWithFormat:@"%@://?source=%@",self.urlScheme,self.caller];
    NSLog(@"開啟外部APP,urlScheme:%@",urlSchemeWithParam);
    bool opened = [[UIApplication sharedApplication] openURL:[NSURL URLWithString:urlSchemeWithParam]];
    // 找不到app時，則開啟下載頁面
    if(!opened) {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:self.downloadUrl]];
    }
}

@end
