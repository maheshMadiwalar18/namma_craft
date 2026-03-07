@echo off
start /b npm run server
start /b npm run dev
timeout /t 10
tasklist | findstr node
