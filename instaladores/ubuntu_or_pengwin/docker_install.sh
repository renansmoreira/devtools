sudo apt update -y \
	&& sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common -y \
	&& curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - \
	&& sudo apt-key fingerprint 0EBFCD88 \
	&& sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu xenial stable" \
	&& sudo apt update -y \
	&& sudo apt-get install docker-ce docker-ce-cli containerd.io -y \
	&& sudo groupadd docker \
	&& sudo usermod -aG docker $USER
