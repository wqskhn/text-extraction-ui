
import React, {PropsWithChildren} from "react";
 
export default (props: PropsWithChildren<any>) => {
    return (
        <
            modules={{data: [], retrievedTime: new Date()}}
            numberOfNotifications={0}
            appBarMenuItems={[]}
            notificationService={new ConsoleNotificationService()}
        
            
            {props.children}>
        </>
    )
}