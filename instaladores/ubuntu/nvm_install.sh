curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash \
	&& echo "" >> ~/.zshrc \
	&& echo "export NVM_DIR=\"\$HOME/.nvm\"" >> ~/.zshrc \
	&& echo "[ -s \"\$NVM_DIR/nvm.sh\" ] && \. \"\$NVM_DIR/nvm.sh\"" >> ~/.zshrc \
	&& echo "[ -s \"\$NVM_DIR/bash_completion\" ] && \. \"\$NVM_DIR/bash_completion\"" >> ~/.zshrc
