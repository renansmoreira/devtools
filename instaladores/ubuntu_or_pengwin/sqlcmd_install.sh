curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add - \
	&& curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list | sudo tee /etc/apt/sources.list.d/msprod.list \
	&& sudo apt update -y \
	&& sudo apt install mssql-tools unixodbc-dev -y \
	&& echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.zshrc
