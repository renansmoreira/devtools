if [ "${1}" == "" ]; then
	echo "Port needed"
    exit 1
fi

for var in "$@"
do
    echo "Killing app in port ${var}"
    lsof -i tcp:${var} | grep -v PID | awk '{print $2}' | xargs kill
done