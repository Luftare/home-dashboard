# home-dashboard

## Setup

Create file: project_root/server/modules/calendar/credentials.json. (Check out: https://developers.google.com/calendar/quickstart/nodejs)

### Start node server:

File path:
/etc/rc.local

File contents:
node /home/pi/apps/home-dashboard/server/index.js &

DISPLAY=:0 chromium-browser --start-fullscreen --disable-infobars &

exit 0


### Start chromium on boot:

File path:
/home/pi/.config/lxsession/LXDE-pi/autostart

File contents:
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xset s off
@xset -dpms
@xset s noblank
@unclutter
@point-rpi
@/usr/bin/chromium-browser --kiosk --disable-restore-session-state --incognito  127.0.0.1:8888
