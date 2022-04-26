sudo pacman -S --noconfirm neovim \
	&& yay -S --noconfirm asdf-vm \
	&& echo ". /opt/asdf-vm/asdf.sh" >> ~/.zshrc \
	&& source ~/.zshrc \
	&& asdf plugin add nodejs \
	&& asdf install nodejs lts \
	&& asdf global nodejs lts \
	&& asdf plugin add rust \
	&& asdf install rust stable \
	&& asdf global rust stable \
	&& sudo pacman -S --noconfirm python \
	&& python -m ensurepip --upgrade \
	&& npm i -g neovim tree-sitter-cli \
	&& bash <(curl -s https://raw.githubusercontent.com/lunarvim/lunarvim/master/utils/installer/install.sh) \
	&& echo "alias lvim=/home/renan/.local/bin/lvim" >> ~/.zshrc \
	&& source ~/.zshrc
