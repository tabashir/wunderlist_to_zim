#Wunderlist Import

Quick and dirty app to create Zim notes ( http://zim-wiki.org/ ) from a Wunderlist backup.

I like Wunderlist and had been using it for a few years.
I created Send_To_Wunderlist app to allow one-click sending from thunderbird to create a task from an email.

However, recently this service has become unreliable. Sometimes it would do a reply-all to alert anyone on the original
email thread that I had created a new task in wunderlist, sometimes it wouldn't recognise my email address and more
recently, it seems to silently fail. Not sure which is worse, but in looking around for alternatives, I discovered Zim.

The combination of Zim and BTSync means I can keep tasks and notes in sync on my phone and laptop and does what I need.

However, I still had a load of tasks in Wunderlist that I didn't want to manually create.

##Usage

1. In Wunderlist, click your name at the top.
1. Choose 'Account Settings'
1. In the 'Account Backup' section, click the 'Create Backup' option
1. It should ask where to save the file, browse to the root folder of this app and save as wunderlist.json
1. Do 'npm update' in the root of this app
1. Alter the zimDataFolder to taste
1. Alter exportAllTasks if you want to export completed tasks as well as incomplete ones
1. run node parseit.js

##Issues

(I'm unlikely to fix these as I no longer have need of this app)

1. It does what I needed and isn't a lesson in nice code. Even less is it a lesson in async event loop code!
1. It doesn't use recursion for tasks/subtasks as it should do, so if you have nested tasks (I only had one level)
then you may have issues.
1. If you have a *really* long title then you could hit a file name limit.
1. It could export more fields or I could make that configurable. I didn't need it so didn't write it!
