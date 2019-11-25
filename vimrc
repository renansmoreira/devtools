syntax on
set number

call plug#begin('~/.vim/plugged')
Plug 'scrooloose/nerdtree'
Plug 'kien/ctrlp.vim'
Plug 'dracula/vim', { 'as': 'dracula' }
Plug 'editorconfig/editorconfig-vim'
call plug#end()

set wildignore+=*/tmp/*,*.so,*.swp,*.zip
set backupcopy=yes

let g:ctrlp_custom_ignore = 'node_modules'
