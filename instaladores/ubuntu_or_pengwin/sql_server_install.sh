wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add - \
	&& sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/16.04/mssql-server-2017.list)" \
	&& sudo apt update -y \
	&& sudo apt install -y mssql-server \
	&& sudo /opt/mssql/bin/mssql-conf setup
