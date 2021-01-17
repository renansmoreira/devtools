URL=https://http.cat/$1

if [[ "$OSTYPE" == *"darwin"* ]]; then
	open $URL
else
	/mnt/c/Program\ Files/Google/Chrome/Application/chrome.exe $URL
fi
