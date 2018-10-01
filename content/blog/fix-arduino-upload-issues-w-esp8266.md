---
title: 'Fix Arduino Upload Errors on ESP8266 with PL2303HX'
date: 2015-02-27
---

I recently took up an interest in physical computing, and have had a lot of fun coming up with projects for the ESP8266 Wifi module. Upon purchase, I realized that I couldn't easily connect it to my mac (i.e. through an Arduino Uno), so I decided to purchase a USB-to-TTL Adapter. Like any savvy shopper would do, I purchased the cheapest adapter on Amazon that would arrive in the next two days (free two day shipping), which was the PL2303HX for about $4.

Once it arrived, so did the issues. Essentally, when I tried to upload a sketch to my board, i'd get this error:
<code>
Sketch uses 240,292 bytes (45%) of program storage space. Maximum is 524,288 bytes.
Uploading 33216 bytes from /var/folders/94/rt16wrlj14ng3z47m6q85qgr0000gn/T/build5456473246941663239.tmp/wifi-weather-sensor.cpp_00000.bin to flash at 0x00000000
error: failed reading byte
warning: espcomm_send_command: cant receive slip payload data
warning: espcomm_send_command(FLASH_DOWNLOAD_BEGIN) failed</code>

After some digging, I found out that there is some sort of compatibility issue with the PL2303HX and that there was a workaround on <a href="http://hpclab.blogspot.com/2015/06/esp8266-arduino-ide-on-mac-os-x.html" target="_blank">this site</a>. Unfortunately, this didn't work, I think it was becasue I was running an updated version of the ESP8266 Arduino Library. This did, however inspire me to come up with a solution.

There is a wonderful Github repository, <a href="https://github.com/themadinventor/esptool" target="_blank">ESPTool.py</a> which is a nifty python script to flash firmware onto the ESP826. All you have to do is download it from GitHub and run `python setup.py install` which will take care of the installation (it will also install the pyserial package.

Once you have this installed, export your sketch to a compiled binary by going to <strong>Sketch</strong> -&gt; <strong>Export Compiled Binary</strong>, which will place a .bin file wherever your sketches are saved ( it was ~/documents/Arduino/ on my Mac). Once you confirm this, it's time to flash.

First you have to find what tty your PL2303HX is running on: type <code>$ ls /dev/tty.\*</code> in your terminal and you should see the port it's running on, for me it was <code>/dev/tty.usbserial</code>.

Next, plug in your ESP8266 (making sure it's in boot mode). In your terminal, navigate to where ver you installed esptool and type:

<code>$ sudo python esptool.py --port /dev/tty.usbserial write_flash 0x00000 ~/documents/Arduino/sketch-name/sketch-name.bin</code>

(replace the path of your sketch with whatever the path of your sketch's .bin file actually is.)

You should see it begin to upload and your program should run as expected.
