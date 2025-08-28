@echo off
REM --- Vào thư mục project ---
cd /d "C:\Users\Admin-IT\Documents\Nguyenthuanit"

REM --- Tạo commit message có ngày giờ ---
for /f "tokens=1-3 delims=/- " %%a in ("%date%") do (
    set ngay=%%a-%%b-%%c
)
for /f "tokens=1-2 delims=:." %%a in ("%time%") do (
    set gio=%%a-%%b
)

set msg=Update index.html - %ngay%_%gio%

REM --- Add + Commit + Push ---
git add .
git commit -m "%msg%"
git push

pause
