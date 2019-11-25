sudo apt install build-essential -y &&
	wget http://download.redis.io/redis-stable.tar.gz &&
	tar xzf redis-stable.tar.gz &&
	cd redis-stable &&
	make &&
	cd .. &&
	sudo mv redis-stable /opt &&
	echo 'export PATH="$PATH:/opt/redis-stable/src"' >> ~/.zshrc
	rm -rf redis-stable.tar.gz
