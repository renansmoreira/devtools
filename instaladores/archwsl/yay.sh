sudo pacman -S base-devel \
	&& git clone https://aur.archlinux.org/yay.git \
	&& cd yay \
	&& makepkg -si \
	&& rm -rf yay
