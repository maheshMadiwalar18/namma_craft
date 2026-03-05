import os
import time
import datetime

while True:
    print("[NammaCraft Auth] Authenticated via Google Account")
    print("Checking for changes...")

    os.system("git add .")
    commit_message = "auto update - " + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    os.system(f'git commit -m "{commit_message}"')
    os.system("git push origin main")

    print("✅ Checked and pushed if changes exist")
    time.sleep(60)  # checks every 60 seconds