import os
import time
from datetime import datetime

while True:
    # Check if there are changes
    status = os.popen("git status --porcelain").read()

    if status.strip() != "":
        print("Changes detected. Pushing to GitHub...")

        os.system("git add .")
        commit_message = "Auto update: " + datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        os.system(f'git commit -m "{commit_message}"')
        os.system("git push origin main")

        print("✅ Code pushed successfully!")
    else:
        print("No changes detected.")

    # Wait 60 seconds before checking again
    time.sleep(60)