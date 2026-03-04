import os
import datetime

# Commit message with time
commit_message = "auto update - " + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# Git commands
os.system("git add .")
os.system(f'git commit -m "{commit_message}"')
os.system("git push origin main")

print("✅ Code automatically pushed to GitHub!")